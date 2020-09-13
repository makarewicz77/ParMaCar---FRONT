import React, { useState, useReducer, useEffect } from "react";
import "./styles.css";
import { Tree, Input } from "antd";
import categoriesReducer, {
  fetchCategories,
  initialCategoriesState,
} from "../../redux/reducers/categoriesReducer";
import { Category } from "../../models/category";

const SearchTree: React.FC = () => {
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

  const { Search } = Input;

  //const x = 4; //  ilość wierszy - u nas liczba kategorii
  //const y = 2; //  ilość rozwijanych
  //const z = 0; //  głębokość
  const gData: any = [];

  const getParentKey = (key: number, tree: number[]) => {
    let parentKey: any;
    for (let i = 0; i < tree.length; i++) {
      const node: any = tree[i];
      if (node.children) {
        if (node.children.some((item: any) => item.key === key)) {
          parentKey = node.key;
        } else if (getParentKey(key, node.children)) {
          parentKey = getParentKey(key, node.children);
        }
      }
    }
    return parentKey;
  };

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
    const children = [];
    // for (let i = 0; i < x; i++) {
    //   const key = `${preKey}-${i}`;
    //   tns.push({ title: key, key });
    //   if (i < y) {
    //     children.push(key);
    //   }
    // }
    // if (_level < 0) {
    //   return tns;
    // }
    // const level = _level - 1;
    // children.forEach((key, index) => {
    //   tns[index].children = [];
    //   return generateData(level, key, tns[index].children);
    // });

    for (let i = 0; i < cat.length; i++) {
      const key = `${preKey}-${cat[i].id}`;
      if (counter >= 0) {
        if (cat[i].parent_id == null) {
          tns.push({ title: cat[i].name, key });
        } else {
          children.push(cat[i].name);
          const tmp: any = cat.find((x) => x.id === cat[i].parent_id)?.id;
          if (tab_prev.find((x) => x === tmp) == null) {
            tab_prev.push(tmp);
          } else {
            tab_prev.push(-1);
          }
        }
      } else if (counter < 0) {
        if (cat[i].parent_id !== null && cat[i].parent_id === p_id) {
          tns.push({ title: cat[i].name, key });
        }
      }
    }

    if (counter < 0) return tns;

    const new_counter = counter - 1;

    children.forEach((key, index) => {
      if (
        tns[index] !== undefined &&
        tab_prev[index] !== undefined &&
        tab_prev[index] !== -1
      ) {
        tns[index].children = [];
        console.log(tab_prev[index]);
        return generateData(
          new_counter,
          key,
          tab_prev[index],
          tns[index].children,
          cat
        );
      } else {
        //return generateData(new_counter, key, null, categories.category);
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

  const onChange = (e: any) => {
    const { value } = e.target;
    const expandedKeys = dataList
      .map((item: any) => {
        if (item.title.indexOf(value) > -1) {
          return getParentKey(item.key, gData);
        }
        return null;
      })
      .filter(
        (item: any, i: number, self: any) => item && self.indexOf(item) === i
      );
    setState({
      expandedKeys,
      searchValue: value,
      autoExpandParent: true,
    });
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
      <h1>SearchTree</h1>
      <div>
        <Search
          style={{ marginBottom: 8 }}
          placeholder="Search"
          onChange={onChange}
        />
        <Tree
          onExpand={onExpand}
          expandedKeys={expandedKeys}
          autoExpandParent={autoExpandParent}
          treeData={loop(gData)}
        />
      </div>
    </>
  );
};

export default SearchTree;
