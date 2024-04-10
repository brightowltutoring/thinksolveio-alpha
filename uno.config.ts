// import { variantGetParameter } from "@unocss/preset-mini/utils";
// import extractorSvelte from "@unocss/extractor-svelte";
// import {
//     presetWebFonts,
//     // presetIcons,
//     defineConfig,
//     presetUno,
//     transformerDirectives,
//     transformerVariantGroup,
//     presetTypography,
//     presetMini,
// } from "unocss";

// // import { fontFamily } from "@unocss/preset-mini/theme";

// // const pwaMediaQueryHandler = (matcher, ctx) => handleCustomMediaQueries(matcher, ctx, 'pwa')


// export default defineConfig({
//     extractors: [extractorSvelte()],
//     // variants: [
//     // adds support for "pwa:" .. breaks in DEV
//     // {
//     //     name: "pwa",
//     //     match(matcher) {
//     //         const pwaVariant = variantGetParameter("pwa", matcher, [":"]);
//     //         if (pwaVariant?.length) {

//     //             const [, rest] = pwaVariant;
//     //             return {
//     //                 matcher: rest,
//     //                 handle: (input, next) =>
//     //                     next({
//     //                         ...input,
//     //                         parent: `${input.parent ? `${input.parent} $$ ` : " "}@media all and (display-mode: standalone)`,
//     //                     }),
//     //             };
//     //         }


//     //     },
//     // },
//     // {
//     //     name: "notpwa",
//     //     match(matcher) {
//     //         const pwaVariant = variantGetParameter("notpwa", matcher, [":"]);
//     //         if (pwaVariant?.length) {

//     //             const [, rest] = pwaVariant;
//     //             return {
//     //                 matcher: rest,
//     //                 handle: (input, next) =>
//     //                     next({
//     //                         ...input,
//     //                         parent: `${input.parent ? `${input.parent} $$ ` : " "}@media not all and (display-mode: standalone)`,
//     //                     }),
//     //             };
//     //         }


//     //     },
//     // },
//     // ],
//     theme: {
//         // ... trying to replicate tailwind ... does nothing
//         // extend: {
//         //     // breakpoints: { pwa: '(display-mode: standalone)' },
//         //     breakpoints: { pwa: { raw: '(display-mode: standalone)' } }
//         // },
//         fontFamily: {
//             // inter: ['"Inter"', fontFamily.sans],
//             // match: ['"Match"', fontFamily.sans],
//             Nunito: ['Nunito', 'sans-serif'],
//             Poppins: ['Poppins', 'sans-serif']
//         },
//     },
//     rules: [],
//     shortcuts: [],
//     // Usage for 'pwa:' media query

//     // Implementing the 'pwa:' media query handler in your code
//     // variants: [
//     //     {
//     //         name: 'pwa',
//     //         match(matcher, ctx) {
//     //             return pwaMediaQueryHandler(matcher, ctx)
//     //         },
//     //         multiPass: true,
//     //     }
//     // ],



//     // preflights: [
//     //     {
//     //         getCSS: () => `
//     //   body {
//     //     overflow-x: hidden;
//     //   }
//     //   `,
//     //     },
//     // ],

//     presets: [
//         presetMini(),
//         // presetIcons({ scale: 1 }),
//         presetTypography(),
//         presetUno(),
//         presetWebFonts({
//             fonts: {
//                 // ...
//             },
//         }),
//         // presetWebFonts({
//         //     fonts: { inter: "Inter:500;" },
//         // }),
//     ],
//     transformers: [transformerDirectives(), transformerVariantGroup()],
// });



// // function handleCustomMediaQueries(matcher, ctx, prefix) {
// //     const variant = variantGetParameter(`${prefix}:`, matcher, ctx.generator.config.separators) // Change '-' to ':'
// //     if (variant) {
// //         const [match, rest] = variant

// //         let media = h.bracket(match) ?? ''
// //         if (media === '')
// //             media = ctx.theme.media?.[match] ?? ''

// //         if (media) {
// //             return {
// //                 matcher: rest,
// //                 handle: (input, next) => next({
// //                     ...input,
// //                     parent: `${input.parent ? `${input.parent} $$ ` : ''}@media ${media}`,
// //                 }),
// //             }
// //         }
// //     }
// // }