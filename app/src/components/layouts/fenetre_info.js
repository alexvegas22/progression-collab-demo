export default {
    props: ['titre', 'codeTest'],
    computed: {
        thèmeSombre() {
            return this.$store.state.thèmeSombre;
        }
    }
}