import { render, screen, fireEvent } from "@testing-library/vue";
import { mount } from "@vue/test-utils";
import { Enonce } from "@/components/Question/Enonce.vue";
import get_question from "@/util/Question";


var énoncé = "La fonction `salutations` affiche une salutation autant de fois que la valeur reçue en paramètre. Utilisez-la pour faire afficher «Bonjour le monde!» autant de fois que le nombre reçu en entrée.";

test("méthode pour obtenir l'énoncé de l'api", async () => {
  return get_question().then((data) => {
    expect(data.attributes.énoncé).toEqual(énoncé);
  });
});





