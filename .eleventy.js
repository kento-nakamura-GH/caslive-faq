module.exports = function(eleventyConfig) {
  // Markdownの改行を<br>タグに変換する設定
  const markdownIt = require("markdown-it");
  const md = markdownIt({
    html: true,
    breaks: true,  // 改行を<br>タグに変換
    linkify: true
  });
  eleventyConfig.setLibrary("md", md);

  // CSSとJSと画像をそのままコピー
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/images");

  // HTMLファイル（利用規約、プライバシーポリシー等）をそのままコピー
  eleventyConfig.addPassthroughCopy({"src/privacy-policy.html": "privacy-policy.html"});
  eleventyConfig.addPassthroughCopy({"src/payment-act.html": "payment-act.html"});
  eleventyConfig.addPassthroughCopy({"src/terms.html": "terms.html"});

  // FAQコレクションを作成
  eleventyConfig.addCollection("faq", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/faq/*.md").sort((a, b) => {
      return b.date - a.date;
    });
  });

  // カテゴリー別にFAQを取得するフィルター
  eleventyConfig.addFilter("filterByCategory", function(faqs, category) {
    if (!category || category === "すべて") {
      return faqs;
    }
    return faqs.filter(faq => faq.data.category === category);
  });

  return {
    pathPrefix: "/caslive-faq/",
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "../_data"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};
