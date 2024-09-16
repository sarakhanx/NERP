import { Button } from "@/components/ui/button";

const HeaderAndParagraph = () => {
  return (
    <>
    <div className="flex flex-col justify-start items-start">
    <p className="text-foreground dark:text-foreground text-base prm-b -tracking-tighter underline underline-offset-4">The font for Copperate Identities will use the font-family of &apos;&nbsp;Prompt&nbsp;&apos;.</p>
      <p className="text-foreground dark:text-foreground text-base prm-l">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolores quaerat, laborum quia architecto provident eum aperiam cumque dolorum laboriosam ab!
      </p>
      <p className="text-foreground dark:text-foreground text-base prm-b -tracking-tighter">Prompt Bold</p>
      <p className="text-foreground dark:text-foreground text-base prm-sb -tracking-tighter">Prompt Semibold</p>
      <p className="text-foreground dark:text-foreground text-base prm-r -tracking-tighter">Prompt Regular</p>
      <p className="text-foreground dark:text-foreground text-base prm-l -tracking-tighter">Prompt Light</p>
    </div>
      <div className="bg-background dark:bg-background flex justify-between gap-4">
        {/* EXPLAIN - Paragraph */}
        <div className="flex justify-center text-start w-full border border-offset-2 border-foreground rounded-xl p-2">
          <div className="flex flex-col justify-center text-start w-full p-2">
            <h1 className="text-foreground dark:text-foreground text-6xl">
              HEADER 1
            </h1>
            <h2 className="text-foreground dark:text-foreground text-5xl">
              HEADER 2
            </h2>
            <h3 className="text-foreground dark:text-foreground text-4xl">
              HEADER 3
            </h3>
            <h4 className="text-foreground dark:text-foreground text-3xl">
              HEADER 4
            </h4>
            <h5 className="text-foreground dark:text-foreground text-2xl">
              HEADER 5
            </h5>
            <h6 className="text-foreground dark:text-foreground text-xl">
              HEADER 6
            </h6>
          </div>
          <div className="flex flex-col justify-center text-start w-full p-2">
            <p className="text-foreground dark:text-foreground text-lg prm-b">
              PARAGRAPH 1 With prm-b
            </p>
            <p className="text-foreground dark:text-foreground text-base prm-sb">
              PARAGRAPH 2 With prm-sb
            </p>
            <p className="text-foreground dark:text-foreground text-sm prm-r">
              PARAGRAPH 3 With prm-r
            </p>
            <p className="text-foreground dark:text-foreground text-xs prm-l">
              PARAGRAPH 4 With prm-l
            </p>
          </div>
        </div>
        {/* EXPLAIN - Button */}
        <div className="flex justify-center items-center w-full border border-offset-2 border-foreground rounded-xl p-2">
          <div className="flex flex-col gap-2 w-full items-start">
            <Button className="bg-primary dark:bg-primary px-5 py-2 rounded-xl w-full text-foreground dark:text-foreground text-sm font-semibold -tracking-tighter">
              BUTTON PRIMARY COLOR [ WIDTH FULL ]
            </Button>
            <Button
              className="bg-chart-1 dark:bg-chart-1
      px-5 py-2 rounded-xl text-foreground dark:text-foreground text-sm -tracking-tighter w-96 prm-b"
            >
              BUTTON 1 [ WIDTH 96 ]
            </Button>
            <Button
              className="bg-chart-2 dark:bg-chart-2
      px-5 py-2 rounded-xl text-foreground dark:text-foreground text-sm -tracking-tighter prm-b w-80"
            >
              BUTTON 2 [ WIDTH 80 ]
            </Button>
            <Button
              className="bg-chart-3 dark:bg-chart-3
      px-5 py-2 rounded-xl w-64 text-foreground dark:text-foreground text-sm -tracking-tighter prm-sb"
            >
              BUTTON 3 [ WIDTH 64 ]
            </Button>
            <Button
              className="bg-chart-4 dark:bg-chart-4
      px-5 py-2 rounded-xl w-48 text-foreground dark:text-foreground text-sm -tracking-tighter prm-r"
            >
              BUTTON 4 [ WIDTH 48 ]
            </Button>
            <Button
              className="bg-chart-5 dark:bg-chart-5
      px-5 py-2 rounded-xl w-32 text-foreground dark:text-foreground text-sm -tracking-tighter font-light prm-l"
            >
              BTN [ WIDTH 32 ]
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderAndParagraph;
