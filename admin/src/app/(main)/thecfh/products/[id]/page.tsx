"use client";

import TheCfhDrawer from "@/src/components/thecfhDrawer";
import TheCfhPhotoView from "@/src/components/ThecfhPhotoView";
import { useGetProductById } from "@/src/hooks/useProducts";
import { useRouterUtil } from "@/src/hooks/useRouterWithLoading";
import { IProduct } from "@/src/lib/type/products.type";
import { TheCfhUtils } from "@/src/utils/thecfhUtils";
import { useEffect, useState } from "react";

export default function Detail() {
  const { params } = useRouterUtil();
  const productData = useGetProductById(Number(params?.id));
  const [product, setProduct] = useState<IProduct | null>();
  const [isOpenDrawerInfo, setIsOpenDrawerInfo] = useState(false);
  useEffect(() => {
    if (productData.data?.data) {
      setProduct(productData.data.data);
    }
  }, [productData]);
  return (
    <div className="container">
      <h4>Product infomation</h4>
      <ul>
        <li>
          Name: <span>{product?.name}</span>
        </li>
        <li>
          Category: <span>{product?.categoryName}</span>
        </li>
        <li>
          Price:
          <span>{TheCfhUtils.formatedPrice(String(product?.price))}</span>
        </li>
        <li>
          Images:
          <span className="flex gap-2 !mt-2">
            <TheCfhPhotoView isSlider photos={product?.imgUrl.split(";")} />
          </span>
        </li>
        <li>
          Description:
          <div className="inline">
            <span
              className="line-clamp-2"
              dangerouslySetInnerHTML={{
                __html: TheCfhUtils.renderHtmlToDom(product?.description),
              }}
            ></span>
            <span
              className="text-blue-500 hover:underline cursor-pointer"
              onClick={() => setIsOpenDrawerInfo(true)}
            >
              read more
            </span>
          </div>
        </li>
      </ul>
      <TheCfhDrawer
        isOpen={isOpenDrawerInfo}
        onClose={() => setIsOpenDrawerInfo(false)}
        className="px-5 py-5"
        width="960px"
      >
        <div
          dangerouslySetInnerHTML={{
            __html: TheCfhUtils.renderHtmlToDom(product?.description),
          }}
        ></div>
      </TheCfhDrawer>
    </div>
  );
}
