import Heading from "../components/ui/Heading";
import Button from "../components/ui/Button";
import HorizontalPCCard from "../components/ui/HorizontalCard";
import VerticalPCCard from "../components/ui/VerticalCard";
import EmailForm from "../components/ui/emailForm";

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
        <HorizontalPCCard
          title="HP Pavilion Gaming Desktop"
          image="/images/hp-pavilion.jpg"
          content="Potente PC da gaming con prestazioni eccellenti per giochi e multitasking."
          specs="Intel Core i7 • 16GB RAM • RTX 3060"
          link="/prodotti/hp-pavilion"
        />
      </section>
      <section className="flex gap-6 justify-around">
        <div>
          <Heading level={3}>Vertical Card</Heading>
          <VerticalPCCard
            title="HP Pavilion Gaming Desktop"
            image="/images/hp-pavilion.jpg"
            content="Potente PC da gaming con prestazioni eccellenti per giochi e multitasking."
            specs={[
              "Intel Core i7-11700",
              "16GB RAM DDR4",
              "NVIDIA RTX 3060 8GB",
              "SSD 512GB + HDD 1TB",
            ]}
            price="1299.99"
            link="/prodotti/hp-pavilion"
          />
        </div>
        <div>
          <Heading level={3}>Vertical Card</Heading>
          <VerticalPCCard
            title="HP Pavilion Gaming Desktop"
            image="/images/hp-pavilion.jpg"
            content="Potente PC da gaming con prestazioni eccellenti per giochi e multitasking."
            specs={[
              "Intel Core i7-11700",
              "16GB RAM DDR4",
              "NVIDIA RTX 3060 8GB",
              "SSD 512GB + HDD 1TB",
            ]}
            price="1299.99"
            link="/prodotti/hp-pavilion"
          />
        </div>
        <div>
          <Heading level={3}>Vertical Card</Heading>
          <VerticalPCCard
            title="HP Pavilion Gaming Desktop"
            image="/images/hp-pavilion.jpg"
            content="Potente PC da gaming con prestazioni eccellenti per giochi e multitasking."
            specs={[
              "Intel Core i7-11700",
              "16GB RAM DDR4",
              "NVIDIA RTX 3060 8GB",
              "SSD 512GB + HDD 1TB",
            ]}
            price="1299.99"
            link="/prodotti/hp-pavilion"
          />
        </div>
      </section>
      <section>
            <div className="py-10">
              <h1 className="text-3xl font-bold text-center">
                SISTEMA DI INVIO MAIL
              </h1>
            </div>
            <div className="flex justify-center">
              <EmailForm />
            </div>
      </section>
    </div>
  );
}
