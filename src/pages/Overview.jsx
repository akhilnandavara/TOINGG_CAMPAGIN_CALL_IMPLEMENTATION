// src/Overview.js

const contents = [
  {
    title: "Build AI Calling Agent",
    description:
      "Create an AI calling agent capable of upselling and cross-selling.",
    button: "Get Started",
  },
  {
    title: "Upselling & Cross-selling",
    description:
      "Increase your sales by utilizing advanced upselling and cross-selling techniques.",
    button: "Learn More",
  },
];

const Overview = () => {
  return (
    <>
      <h1 className="text-3xl font-bold text-DarkBg mb-4">Welcome to Toingg</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {contents.map((content, index) => (
          <div
            key={index}
            className="bg-gradient-to-r from-gradientStart to-gradientEnd p-4 rounded-lg shadow-md"
          >
            <h2 className="text-2xl font-semibold mb-2">{content.title}</h2>
            <p className="text-DarkBg">{content.description}</p>
            <button className="mt-4 px-4 py-2 bg-DarkBg text-white rounded-md">
              {content.button}
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Overview;
