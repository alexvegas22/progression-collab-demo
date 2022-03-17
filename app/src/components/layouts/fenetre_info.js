export default {
    props: {
        titre: String,
    },
    computed: {
        thèmeSombre() {
            return this.$store.state.thèmeSombre;
        }
    }
}