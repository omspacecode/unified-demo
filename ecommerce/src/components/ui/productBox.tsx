import Image from "next/image";
import { Button } from "./button";

interface ProductBoxProps {
  productData: any;
}

function getLocalizedText(value: any) {
  if (!value || typeof value !== "object") {
    return value ?? "";
  }

  return value["en-US"] ?? value.Default ?? Object.values(value).find((item) => typeof item === "string") ?? "";
}

const ProductBox: React.FC<ProductBoxProps> = ({ productData }) => {
  let product = productData?.data || productData?.value?.data;

  const image = product?.images?.[0];
  const productName = getLocalizedText(product?.productName);

  if (!image?.image) {
    return null;
  }

  return (
    <a
      className="group block w-full [perspective:1200px]"
      href={`/product/${product?.handle}`}
    >
      <div className="relative h-[380px] w-full transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        {/* Front face */}
        <div className="absolute inset-0 flex flex-col [backface-visibility:hidden]">
          <div className="relative h-[300px] w-full overflow-hidden rounded-md border border-zinc-300">
            <Image
              src={image.image}
              alt={image.altText || productName || "Product image"}
              fill={true}
              style={{ objectFit: "cover" }}
              loading="lazy"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 400px"
            />
          </div>
          <div className="mt-3 flex w-full flex-col">
            <div className="flex w-full justify-between gap-3 text-left text-black">
              <div className="overflow-hidden text-ellipsis break-words">
                {productName}
              </div>
              <p className="font-semibold">${product?.price}</p>
            </div>
            <p className="mt-1 text-left text-stone-500">
              {product?.colors?.[0]?.label}
            </p>
          </div>
        </div>

        {/* Back face */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-md border border-zinc-300 bg-black p-6 text-center text-white [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <div className="overflow-hidden text-ellipsis break-words font-medium">
            {productName}
          </div>
          <p className="text-2xl font-semibold">${product?.price}</p>
          <Button
            type="button"
            variant="secondary"
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </a>
  );
};

export default ProductBox;
