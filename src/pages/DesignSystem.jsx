import Heading from "../components/ui/Heading";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import VerticalCard from "../components/ui/VerticalCard";

export default function DesignSystem() {
  return (
    <div className="space-y-4 p-6">
      <section>
        <Heading level={3}>Typography</Heading>
        <Heading level={1}>Heading h1</Heading>
        <Heading level={2}>Heading h2</Heading>
        <Heading level={3}>Heading h3</Heading>
        <Heading level={4}>Heading h4</Heading>
        <Heading level={5}>Heading h5</Heading>
        <Heading level={6}>Heading h6</Heading>
      </section>
      <hr />
      <section>
        <Heading level={3}>Buttons</Heading>
        <Button size="sm">Primary sm</Button>
        <br />
        <Button variant="secondary" size="sm">
          Secondary sm
        </Button>
        <br />
        <Button>Primary</Button>
        <br />
        <Button variant="secondary">Secondary</Button>
        <br />
        <Button size="lg">Primary lg</Button>
        <br />
        <Button variant="secondary" size="lg">
          Secondary lg
        </Button>
      </section>
      <hr />
      <section>
        <Heading level={3}>Cards</Heading>
        <div className="w-96">
          <Card image={""} title={"Titolo"} content={"Prova"} />
        </div>
      </section>
      <section className="flex gap-6 justify-around">
        <div>
          <Heading level={3}>Vertical Card</Heading>
          <VerticalCard
            title={"Titolo"}
            image={""}
            content={"Prova"}
            director={"Regista"}
            link={"/"}
          />
        </div>
        <div>
          <Heading level={3}>Vertical Card</Heading>
          <VerticalCard
            title={"Titolo"}
            image={""}
            content={"Prova"}
            director={"Regista"}
            link={"/"}
          />
        </div>
        <div>
          <Heading level={3}>Vertical Card</Heading>
          <VerticalCard
            title={"Titolo"}
            image={""}
            content={"Prova"}
            director={"Regista"}
            link={"/"}
          />
        </div>
      </section>
    </div>
  );
}
