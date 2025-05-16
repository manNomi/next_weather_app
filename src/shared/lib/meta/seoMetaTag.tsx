import Head from "next/head";

const APP_NAME = "Weather App";
const DEFAULT_DESCRIPTION =
  "도시별 최신 날씨를 무료로 확인하세요. 날씨 예보, 기온, 습도, 바람 세기 등 다양한 정보를 제공합니다.";

const SeoMetaTags = (props: SeoMetaTagsProps) => {
  const { title, description } = props;

  const pageTitle = title ? `${title} | ${APP_NAME}` : APP_NAME;
  const metaDescription = description || DEFAULT_DESCRIPTION;
  return (
    <Head>
      {title && <title>{pageTitle}</title>}
      {description && <meta name="description" content={metaDescription} />}

      {/* Open Graph */}
      <meta property="og:site_name" content={APP_NAME} />
      {title && <meta property="og:title" content={pageTitle} />}
      {description && (
        <meta property="og:description" content={metaDescription} />
      )}
      <meta property="og:type" content="website" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      {title && <meta name="twitter:title" content={pageTitle} />}
      {description && (
        <meta name="twitter:description" content={metaDescription} />
      )}
    </Head>
  );
};
export default SeoMetaTags;
