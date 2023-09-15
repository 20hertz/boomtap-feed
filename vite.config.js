import { loadEnv } from "vite";
import path from "path";
import { createHtmlPlugin } from "vite-plugin-html";

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    root: "src",
    build: {
      outDir: "../dist",
    },
    resolve: {
      alias: {
        "~bootstrap": path.resolve(__dirname, "node_modules/bootstrap"),
      },
    },
    plugins: [
      createHtmlPlugin({
        minify: true,
        inject: {
          data: {
            aweberFormId: env.VITE_AWEBER_FORM_ID,
            aweberFormName: env.VITE_AWEBER_FORM_NAME,
            aweberListId: env.VITE_AWEBER_LIST_ID,
            aweberRedirectUrl: env.VITE_AWEBER_REDIRECT_URL,
          },
        },
      }),
    ],
  };
};
