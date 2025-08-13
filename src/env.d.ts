/// &lt;reference types="astro/client" />
/// &lt;reference types="@astrojs/vue/client" />
/// &lt;reference types="@sanity/astro/module" />

interface ImportMetaEnv {
  readonly SANITY_CONTRIBUTER_TOKEN?: string;
  readonly SANITY_EDITOR_TOKEN?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}