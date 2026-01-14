export default {
    plugins: {
        '@tailwindcss/postcss': {},
        autoprefixer: {}, // autoprefixer is usually included in tailwindcss v4 but good to resolve explicitly? specific v4 docs say just @tailwindcss/postcss is enough, but user has autoprefixer installed. I'll keep it for safety unless it conflicts.
    },
}
