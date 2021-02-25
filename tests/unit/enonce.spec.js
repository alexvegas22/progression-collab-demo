import { render, screen } from "@testing-library/vue";
import { mount } from "@vue/test-utils";
import Enonce from "@/components/Question/Enonce.vue";
import get_question from "@/util/Question";

var énoncé =
  "La fonction `salutations` affiche une salutation autant de fois que la valeur reçue en paramètre. Utilisez-la pour faire afficher «Bonjour le monde!» autant de fois que le nombre reçu en entrée.";

test("méthode pour obtenir l'énoncé de l'api", async () => {
  return get_question().then((data) => {
    expect(data.attributes.énoncé).toEqual(énoncé);
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

  it("Lien tentative affichée", async () => {
    const wrapper = mount(Enonce, {
      propsData: {
        question: EnonceMock,
      },
    });
    expect(wrapper.findAll("h2")[0].html()).toEqual(
      "<h2>"+énoncé+"</h2>"
    );
  });
});


test("l'affichage  correspond  à l'énoncé", async () => {
  render(Enonce);
  expect(screen.queryByText(énoncé)).toBeTruthy();
});

test("Enonce component avec affichage de l'énoncé v1", async () => {
  const wrapper = mount(Enonce, {
    propsData: {
      question: "Un énoncé",
    },
  });
  expect(wrapper.props().question).toEqual("Un énoncé");
});

test("Enonce component avec affichage de l'énoncé ", async () => {
  const wrapper = mount(<Enonce />, {
    propsData: {
      question: ["Un énoncé"],
    },
  });
  expect(wrapper.props().question[0]).toEqual("Un énoncé");
});
