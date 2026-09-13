const faqs = [
  {
    q: "What happens after I submit the form?",
    a: "Someone from our team may contact you to schedule a free consult, ask a few clarifying questions, and help determine whether connecting you with specialists is appropriate.",
  },
  {
    q: "Is the consult really free?",
    a: "Yes. Requesting a consult through this site is free. There is no obligation to move forward after you speak with us.",
  },
  {
    q: "Do you guarantee my solar contract will be cancelled?",
    a: "No. We do not guarantee cancellation, refunds, payment reductions, or any specific result. Every situation is different, and submitting a form is not a promise of relief.",
  },
  {
    q: "What information should I have ready?",
    a: "It helps to have your contract type (lease, loan, PPA, or owned), approximate monthly payment, installer or lender name if you know it, and any documents you are comfortable sharing during a consult.",
  },
  {
    q: "Is this legal advice?",
    a: "No. Information on this site and conversations that start from a lead form are not legal advice. Specialists may discuss options relevant to your situation, but outcomes are never guaranteed.",
  },
  {
    q: "Who will contact me?",
    a: "A representative associated with this brand may reach out using the phone or email you provide. If your situation appears suitable, we may help connect you with specialists for a deeper review.",
  },
];

export function FAQ() {
  return (
    <section className="bg-slate-50 py-16 sm:py-20" id="faq">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-tight text-navy-900 sm:text-3xl">
            Frequently asked questions
          </h2>
          <p className="mt-3 text-slate-600">
            Straightforward answers — no outcome guarantees, no legal advice claims.
          </p>
        </div>
        <div className="mt-10 space-y-3">
          {faqs.map((item) => (
            <details
              key={item.q}
              className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm open:shadow-md"
            >
              <summary className="cursor-pointer list-none text-left text-base font-semibold text-navy-900 marker:content-none [&::-webkit-details-marker]:hidden">
                <span className="flex items-start justify-between gap-4">
                  {item.q}
                  <span className="mt-0.5 text-teal-600 transition group-open:rotate-45">
                    +
                  </span>
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
