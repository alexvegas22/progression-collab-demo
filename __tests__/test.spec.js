import get_solutions_user from "../src/util/get_solutions_user";


describe( "Tests Solutions", ()=>{
   // it("test question solutions", async ()=>{
   //     const attendu = [{"code": "print(\"Ayoye, cest pas facile de mettre un quote la dedans\")", "date_soumission": 42, "feedback": "Je suis Python", "langage": 0}, {"code": "System.out.println(\"Ayoye, cest pas facile de mettre un quote la dedans\")", "date_soumission": 43, "feedback": "Je suis Java", "langage": 1}, {"id": "ma_question_pas_repondue", "solutions": [], "état": 0}]
   //     const res = await get_solutions_user('ma_question')
   //     expect(res.solutions).toMatchObject(attendu)
   // })
    it("test etat question pas réussie", async ()=>{
        const res = await get_solutions_user('ma_question')
        expect(res.état).toBe(1)
    })
}
)


