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
  const [registry] = useState(() => {
    const cache = createCache({ key: "css" });
    cache.compat = true;
    return cache;
  });

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
