import { render, screen } from "@testing-library/vue";
import { mount } from "@vue/test-utils";
import Enonce from "@/components/Question/Enonce.vue";
import get_question from "@/util/Question";

var enonce =
  "La fonction `salutations` affiche une salutation autant de fois que la valeur reçue en paramètre. Utilisez-la pour faire afficher «Bonjour le monde!» autant de fois que le nombre reçu en entrée.";

test("méthode pour obtenir l'énoncé de l'api", async () => {
  return get_question().then((data) => {
    expect(data.attributes.énoncé).toEqual(enonce);
  });
});

test("l'affichage ne correspond pas à l'énoncé", async () => {
  render(Enonce);
  expect(screen.queryByText("test")).toBeFalsy();
});

describe("Test sur le component Enonce", () => {
  let EnonceMock;

  beforeAll(async () => {
    await get_question().then(
      (data) => (EnonceMock = data.attributes.énoncé)
    );
  });

  it("Injection énoncé dans le prop et affichage dans une balise h2", async () => {
    const wrapper = mount(Enonce, {
      propsData: {
        enonce: EnonceMock,
      },
    });
    expect(wrapper.findAll("h2")[0].html()).toEqual(
      "<h2>" + enonce + "</h2>"
    );
  });
});
//TODO A vérifier plus tard pour savoir le bon fonctionnement du test.
/** 
test("l'affichage  correspond  à l'énoncé", async () => {
  render(Enonce);
  expect(screen.queryByText(enonce)).toBeTruthy();
});
*/

test("Enonce component avec affichage de l'énoncé v1", async () => {
  const wrapper = mount(Enonce, {
    propsData: {
      enonce: "Un énoncé",
    },
  });
  expect(wrapper.props().enonce).toEqual("Un énoncé");
});

test("Enonce component avec affichage de l'énoncé ", async () => {
  const wrapper = mount(<Enonce />, {
    propsData: {
      enonce: ["Un énoncé"],
    },
  });
  expect(wrapper.props().enonce[0]).toEqual("Un énoncé");
});
