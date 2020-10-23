import React, { useState, useReducer, useEffect } from "react";
import "./styles.css";
import { Tree } from "antd";
import categoriesReducer, {
  fetchCategories,
  initialCategoriesState,
} from "../../redux/reducers/categoriesReducer";
import { Category } from "../../models/category";
import slugify from "react-slugify";
import { Link, Redirect, useHistory } from "react-router-dom";

const SearchTree: React.FC = () => {
  let history = useHistory();
  const [categories, dispatch] = useReducer(
    categoriesReducer,
    initialCategoriesState
  );

  useEffect(() => {
    const onLoad = () => {
      fetchCategories()(dispatch);
    };

    window.addEventListener("load", onLoad);
    return () => {
      window.removeEventListener("load", onLoad);
    };
  }, []);

  const [state, setState] = useState({
    expandedKeys: [],
    searchValue: "",
    autoExpandParent: true,
  });

  const gData: any = [];

  const generateData = (
    counter: number,
    _preKey: string | undefined,
    prev_id: number | null,
    _tns: any,
    cat: Category[]
  ) => {
    const preKey = _preKey || "0";
    const tns = _tns || gData;
    const p_id = prev_id || -1;
    const tab_prev: number[] = [];
    const children: string[] = [];

    cat.forEach((k, i) => {
      const key = `${preKey}-${cat[i].id}`;
      if (counter >= 0) {
        if (cat[i].parent_id == null) {
          tns.push({ title: cat[i].name, key });
          if (cat[i + 1] != null && cat[i + 1].parent_id == null)
            tab_prev.push(-1);
        } else {
          children.push(cat[i].name);
          const tmp: any = cat[i].parent_id;
          if (tab_prev.find((x) => x === tmp) == null) {
            tab_prev.push(tmp);
          }
        }
      } else if (counter < 0) {
        if (cat[i].parent_id !== null && cat[i].parent_id === p_id) {
          tns.push({ title: cat[i].name, key });
        }
      }
    });

    if (counter < 0) return tns;

    const new_counter = counter - 1;

    children.forEach((key, index) => {
      if (
        tns[index] !== undefined &&
        tab_prev[index] !== undefined &&
        tab_prev[index] !== -1
      ) {
        tns[index].children = [];
        return generateData(
          new_counter,
          key,
          tab_prev[index],
          tns[index].children,
          cat
        );
      }
    });
  };
  generateData(0, "", null, null, categories.category);

  const dataList: any = [];
  const generateList = (data: any) => {
    for (let i = 0; i < data.length; i++) {
      const node = data[i];
      const { key } = node;
      dataList.push({ key, title: key });
      if (node.children) {
        generateList(node.children);
      }
    }
  };
  generateList(gData);

  const onExpand = (expandedKeys: any) => {
    setState({
      expandedKeys,
      searchValue: "",
      autoExpandParent: false,
    });
  };

  const onSelect = (title: any) => {
    if (title !== undefined && categories.category !== undefined) {
      const index: number = parseInt(title.toString().split("-").pop());
      const cat = categories.category.find(
        (x: { id: number }) => x.id === index
      );
      if (cat !== undefined) {
        const cat_name = cat.name;
        history.push(`category/${slugify(cat_name)}/`);
        // const location = `/${slugify(cat_name)}/`;
        // return (
        //   <>
        //     <Redirect to={location} push={true} />
        //     {console.log(location)}
        //   </>
        // );
      }
    }
  };

  const { searchValue, expandedKeys, autoExpandParent } = state;
  const loop = (data: any) =>
    data.map((item: any) => {
      const index = item.title.indexOf(searchValue);
      const beforeStr = item.title.substr(0, index);
      const afterStr = item.title.substr(index + searchValue.length);
      const title =
        index > -1 ? (
          <span>
            {beforeStr}
            <span className="site-tree-search-value">{searchValue}</span>
            {afterStr}
          </span>
        ) : (
          <span>{item.title}</span>
        );
      if (item.children) {
        return { title, key: item.key, children: loop(item.children) };
      }

      return {
        title,
        key: item.key,
      };
    });

  return (
    <>
      <div className="tree_menu_div">
        <Tree
          onExpand={onExpand}
          expandedKeys={expandedKeys}
          autoExpandParent={autoExpandParent}
          treeData={loop(gData)}
          onSelect={onSelect}
        />
      </div>
    </>
  );
};

export default SearchTree;
