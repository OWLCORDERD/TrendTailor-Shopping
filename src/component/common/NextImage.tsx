"use client";

import Image from "next/image";
import React, { useMemo, useState } from "react";
import "@/styles/nextImage.scss";

interface ImageProps {
  src: any;
  alt: string;
  width?: number;
  height?: number;
  hasSkeleton?: boolean;
}

const NextImage = ({ src, alt, width, height, hasSkeleton }: ImageProps) => {
  // 이미지 경로 바인딩 관리 (기본 props 경로 값으로 초기화)
  const [imgPath, setImgPath] = useState<any>(src);

  const [isLoad, setIsLoad] = useState<boolean>(false);
  // 이미지 사이즈 조정 (기본값: 250 * 250)
  const imageSize = useMemo(() => {
    const size = {
      width: 250,
      height: 250,
    };

    if (width || height) {
      size.width = width ? width : size.width;
      size.height = height ? height : size.height;
    }

    return size;
  }, [width, height]);

  // 이미지 경로 로드 실패 시, 대체 이미지 변경 처리
  const onErrorHandle = () => {
    setImgPath("/slider/no-data.svg");
  };

  return (
    <>
      {!isLoad && hasSkeleton && (
        <div className='skeleton'>
          <span className='loader' />
        </div>
      )}
      <Image
        src={imgPath}
        alt={alt}
        width={imageSize.width}
        height={imageSize.height}
        onError={onErrorHandle}
        onLoad={() => setIsLoad(true)}
        style={{
          position: "relative",
        }}
      ></Image>
    </>
  );
};

export default NextImage;
