"use client";

import React, { useState } from "react";
import { useServerInsertedHTML } from "next/navigation";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

export default function EmotionRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  // 1. cache를 정의하지 않고 쓰면 에러가 나기 때문에, useState 안에서 직접 생성해야 해.
  const [registry] = useState(() => {
    const cache = createCache({ key: "css" }); // 여기서 'css'라는 키로 캐시 생성
    cache.compat = true;
    return cache;
  });

  // 2. 서버 사이드 렌더링 시점에 스타일을 HTML 헤더에 강제로 끼워넣는 로직이야.
  useServerInsertedHTML(() => {
    return (
      <style
        data-emotion={`${registry.key} ${Object.keys(registry.inserted).join(" ")}`}
        dangerouslySetInnerHTML={{
          __html: Object.values(registry.inserted).join(" "),
        }}
      />
    );
  });

  return <CacheProvider value={registry}>{children}</CacheProvider>;
}
