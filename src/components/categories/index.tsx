import React from "react";
import "./styles.css";
import SearchTree from "../../views/SearchTree";
import { useTranslation } from "react-i18next";

const Categories: React.FC = () => {
  const { t } = useTranslation("common");
  return (
    <>
      <h1>{t('categories')}</h1>
      <hr />
      <SearchTree />
      <hr />
    </>
  );
};

export default Categories;
