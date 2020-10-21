import React from "react";
import { Product } from "../../../models/product";
import Loader from "react-loader-spinner";
import "./styles.css";
import { Card, Col, Popover, Row } from "antd";
import { cutDescription, getImageUrl } from "../../../utils/utils";
import { useTranslation } from "react-i18next";
import noAvailable from "../../../static/noavailable.jpg"

type productsListProps = {
  products: Product[];
};

const fullDescription = (description: string) =>
{
  return(
    <div>
      <p>{description}</p>
    </div>
  )
}

const ProductList: React.FC<productsListProps> = ({ products }) => {
  const {t} = useTranslation("common");
  return (
    <>
      {products.length > 0 ? (
        <div className="products_list">
        <Row gutter={16}>
          {products.map((product: Product) => {
            return (
              <div style={{display:"inline"}}>
                <Col span={8}>

        
              <Card
                style={{ width: 160 }}
                cover={
                  <>
                  {product.image === null ? <img
                    alt="example"
                    src={noAvailable}
                    className="product_image"
                  /> : 
                  <img
                    alt="example"
                    src={getImageUrl(product.image)}
                    className="product_image"
                  />}
                  <h5 className="product_name">{product.name}</h5>
                  </>
                }
              > 
              {product.description.length > 55 ?    
              <Popover content={fullDescription(product.description)}><div>
                    <p className="product_producer">{product.producer}</p>
     <p className="product_short_description">{cutDescription(product.description)}</p>
              </div>
           
              </Popover> :
              <div className={product.description.length > 16 ? "product_div_long" : "product_div_short"}>
                <p className="product_producer">{product.producer}</p>
                <p className="product_short_description">{product.description}</p>
              </div> 
               
              } 
              <h5 className="product_price">{product.gross} {t("product.value")}</h5>
             </Card>
            
                        </Col>
                    </div>
            );
      
          })}
                </Row>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default ProductList;
