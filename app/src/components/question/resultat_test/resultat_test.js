import parseMD from "@/util/parse";
const diff = require("diff");

const différence = function (orig_p, modif_p, class_diff) {
  const orig = orig_p ?? "";
  const modif = modif_p ?? "";
  const différences = diff.diffChars(orig, modif);

  var résultat = "";

  différences.forEach((différence) => {
    if (différence.added) {
      résultat += `<span class="diff ${class_diff}">${différence.value}</span>`;
    }
    if (!différence.added && !différence.removed) {
      résultat += différence.value;
    }
  });

  return résultat.replaceAll("\n", '<span class="diff visuel">↵\n</span>');
};

export default {
  name: "ResultatTest",
  data() {
    return {
      sortie_observée: null,
      sortie_attendue: null,
      feedback: null,
    };
  },
  props: {
    test: null,
    resultat: null,
  },
  computed: {
    mode_affichage() {
      return this.$store.state.mode_affichage;
    },
  },
  mounted() {
    this.sortie_attendue = this.resultat
      ? différence(
          this.resultat.sortie_observée,
          this.test.sortie_attendue,
          "différent ins"
        )
      : this.test.sortie_attendue.replaceAll(
          "\n",
          '<span class="diff visuel">↵\n</span>'
        );
  },
  watch: {
    resultat: function () {
      this.sortie_observée = différence(
        this.test.sortie_attendue,
        this.resultat.sortie_observée,
        "différent del" + (this.mode_affichage == 1 ? " enabled" : "")
      );
      this.sortie_attendue = différence(
        this.resultat.sortie_observée,
        this.test.sortie_attendue,
        "différent ins" + (this.mode_affichage == 1 ? " enabled" : "")
      );
      this.feedback = parseMD(this.resultat.feedback);
    },
    mode_affichage: function (mode) {
      if (mode == 1) {
        document.getElementsByClassName("diff différent").forEach((item) => {
          item.classList.add("enabled");
        });
        document.getElementsByClassName("diff visuel").forEach((item) => {
          item.classList.add("enabled");
        });
      } else {
        document.getElementsByClassName("diff différent").forEach((item) => {
          item.classList.remove("enabled");
        });
        document.getElementsByClassName("diff visuel").forEach((item) => {
          item.classList.remove("enabled");
        });
      }
    },
  },
};
