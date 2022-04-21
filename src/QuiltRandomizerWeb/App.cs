using Bridge;
using Newtonsoft.Json;
using System;
using Bridge.Html5;
using System.Collections.Generic;

namespace QuiltRandomizerWeb
{
    public class App
    {
        static HTMLInputElement heightInput;
        static HTMLInputElement widthInput;
        static HTMLInputElement squareTypeInput;
        static HTMLDivElement outputArea;
        static HTMLDivElement countArea;
        static string getColor(int id)
        {
            Random r = new Random(id);
            int red = (int)(r.Next(256)* 0.85);
            int green = (int)(r.Next(256) * 0.85);
            int blue = (int)(r.Next(256) * 0.85);
            return "#" + red.ToString(16) + green.ToString(16) + blue.ToString(16);
        }
        public static void Main()
        {
            Document.Body.Style.FontFamily = "Helvetica";
            Document.Body.Style.BackgroundColor = "#ddd";
            Document.Body.Style.Color = "#666";
            Document.Body.Style.FontSize = "25pt";
            Document.Body.Style.TextAlign = "center";

            HTMLTableElement controlsTable = new HTMLTableElement();
            HTMLTableRowElement widthRow = controlsTable.InsertRow(0);
            HTMLTableRowElement heightRow = controlsTable.InsertRow(1);
            HTMLTableRowElement typesRow = controlsTable.InsertRow(2);
            controlsTable.Style.Display = "inline-block";

            HTMLHeadingElement heading = new HTMLHeadingElement(HeadingType.H1);
            heading.Style.Color = "#222";
            heading.TextContent = "Quilt Randomizer";
            heading.Style.FontSize = "50pt";
            widthInput = new HTMLInputElement();
            widthInput.Type = InputType.Number;
            widthInput.Value = "10";
            widthInput.Style.FontSize = "20pt";
            heightInput = new HTMLInputElement();
            heightInput.Type = InputType.Number;
            heightInput.Value = "10";
            heightInput.Style.FontSize = "20pt";
            squareTypeInput = new HTMLInputElement();
            squareTypeInput.Type = InputType.Number;
            squareTypeInput.Value = "10";
            squareTypeInput.Style.FontSize = "20pt";
            outputArea = new HTMLDivElement();
            outputArea.Style.BackgroundColor = "#eee";
            outputArea.Style.Padding = "10px";
            outputArea.Style.Display = "inline-block";
            outputArea.Style.Border = "1px solid";

            countArea = new HTMLDivElement();
            countArea.Style.BackgroundColor = "#eee";
            countArea.Style.Padding = "10px";
            countArea.Style.Display = "inline-block";
            countArea.Style.Border = "1px solid";

            Document.Title = "Quilt Randomizer";
            Document.Body.AppendChild(heading);
            widthRow.AppendChild(new HTMLTableDataCellElement() { InnerHTML = "Width: " });
            widthRow.Children[0].Style.TextAlign = "right";
            widthRow.AppendChild(new HTMLTableDataCellElement().AppendChild(widthInput));
            heightRow.AppendChild(new HTMLTableDataCellElement() { InnerHTML = "Height: " });
            heightRow.Children[0].Style.TextAlign = "right";
            heightRow.AppendChild(new HTMLTableDataCellElement().AppendChild(heightInput));
            typesRow.AppendChild(new HTMLTableDataCellElement() { InnerHTML = "How many types of tile: " });
            typesRow.Children[0].Style.TextAlign = "right";
            typesRow.AppendChild(new HTMLTableDataCellElement().AppendChild(squareTypeInput));
            Document.Body.AppendChild(controlsTable);

            Document.Body.AppendChild(new HTMLBRElement());
            HTMLButtonElement generate = new HTMLButtonElement();
            generate.TextContent="Generate Square";
            generate.Style.FontSize = "20pt";
            generate.OnClick = new Action<MouseEvent<HTMLButtonElement>>(doGenerate);
            Document.Body.AppendChild(generate);
            Document.Body.AppendChild(new HTMLSpanElement() { InnerHTML = "&nbsp;&nbsp;" });
            HTMLButtonElement generateHex = new HTMLButtonElement();
            generateHex.TextContent = "Generate Hex";
            generateHex.Style.FontSize = "20pt";
            generateHex.OnClick = new Action<MouseEvent<HTMLButtonElement>>(doGenerateHex);
            Document.Body.AppendChild(generateHex);
            Document.Body.AppendChild(new HTMLSpanElement() { InnerHTML = "&nbsp;&nbsp;" });
            HTMLButtonElement getHelp = new HTMLButtonElement();
            getHelp.TextContent = "Help!";
            getHelp.Style.FontSize = "20pt";
            getHelp.OnClick = new Action<MouseEvent<HTMLButtonElement>>(help);
            Document.Body.AppendChild(getHelp);
            Document.Body.AppendChild(new HTMLBRElement());

            Document.Body.AppendChild(new HTMLBRElement());
            Document.Body.AppendChild(outputArea);

            Document.Body.AppendChild(new HTMLBRElement());

            Document.Body.AppendChild(countArea);
            help(null);
        }
        static void help(object sender)
        {
            while (outputArea.Children.Length > 0)
                outputArea.RemoveChild(outputArea.Children[0]);

            outputArea.AppendChild(new HTMLHeadingElement(HeadingType.H2) { TextContent = "Quilt Randomizer - Help!" });

            outputArea.AppendChild(new HTMLHeadingElement(HeadingType.H3) { TextContent = "What does it do?" });
            outputArea.AppendChild(new HTMLParagraphElement() { TextContent = "The Quilt Randomizer is a simple way to generate unique and random quilt tilings that do not have two tiles the same touching. All you have to do is enter in the dimensions (width and height) in number of tiles, enter in the number of different tile types you want to place, and it will do the rest." });

            outputArea.AppendChild(new HTMLHeadingElement(HeadingType.H3) { TextContent = "What do the colours mean?" });
            outputArea.AppendChild(new HTMLParagraphElement() { TextContent = "They're just there to make it easier to read." });

            outputArea.AppendChild(new HTMLHeadingElement(HeadingType.H3) { TextContent = "How can I save a pattern?" });
            outputArea.AppendChild(new HTMLParagraphElement() { TextContent = "Just go file->save in your browser. Some browsers seem to mess the page up a bit but you should still be able to read it." });
        }
        static void output()
        {
            while (outputArea.Children.Length > 0)
                outputArea.RemoveChild(outputArea.Children[0]);

            var table = outputArea.AppendChild(new HTMLTableElement());
            ((HTMLTableElement)table).Style.MinHeight = (height * 1.5) + "em";

            for (int y = 0; y < height; y++)
            {
                var row = table.AppendChild(new HTMLTableRowElement());

                for (int x = 0; x < width; x++)
                {
                    var v = new HTMLTableDataCellElement() { TextContent = (values[x, y] + 1).ToString() };
                    v.Style.Padding = "10px";
                    v.Style.Color = getColor(values[x, y] + 1);
                    v.Style.MinWidth = "1.3em";
                    row.AppendChild(v);
                }

            }
        }
        static void outputCounts()
        {
            int total = 0;
            int[] counts = new int[typeCount];
            foreach (int i in values) {
                counts[i]++;
                total++;
            }

            while (countArea.Children.Length > 0)
                countArea.RemoveChild(countArea.Children[0]);
            countArea.AppendChild(new HTMLHeadingElement(HeadingType.H2) { InnerHTML = "Quantities Needed" });

            for (int i = 0; i < counts.Length; i++)
            {
                var p = new HTMLParagraphElement() { InnerHTML = $"Type {i+1} Tiles: {counts[i]} needed."};
                p.Style.Color = getColor(i+1);
                countArea.AppendChild(p);
            }
            countArea.AppendChild(new HTMLParagraphElement() { InnerHTML = $"Total needed: {total}." });
        }
        static void outputHex()
        {
            while (outputArea.Children.Length > 0)
                outputArea.RemoveChild(outputArea.Children[0]);

            var table = outputArea.AppendChild(new HTMLTableElement());
            ((HTMLTableElement)table).Style.MinHeight = (height * 1.5) + "em";
            for (int y = 0; y < height; y++)
            {
                var row = table.AppendChild(new HTMLTableRowElement());

                if (y % 2 == 0)
                    ((HTMLTableRowElement)row).Style.Transform = "translate(0.45em)";
                else
                    ((HTMLTableRowElement)row).Style.Transform = "translate(-0.45em)";
                for (int x = 0; x < width; x++)
                {
                    var v = new HTMLTableDataCellElement() { TextContent = (values[x, y] + 1).ToString() };
                    v.Style.Padding = "10px";
                    v.Style.Color = getColor(values[x, y] + 1);
                    v.Style.MinWidth = "1.3em";
                    row.AppendChild(v);
                }

            }

        }
        static void doGenerateHex(object sender)
        {
            width = int.Parse(widthInput.Value);
            height = int.Parse(heightInput.Value);
            typeCount = int.Parse(squareTypeInput.Value);

            values = new int[width, height];
            for (int x = 0; x < width; x++)
                for (int y = 0; y < height; y++)
                    values[x, y] = -1;

            Random r = new Random();
            for (int x = 0; x < width; x++)
            {
                for (int y = 0; y < height; y++)
                {
                    var p = hexPossibilities(x, y);
                    if (p.Length == 0)
                    {
                        outputImpossible();
                        return;
                    }
                    else
                        values[x, y] = p[r.Next(0, p.Length)];
                }

            }
            outputHex();
            outputCounts();
        }
        static void outputImpossible()
        {
            while (outputArea.Children.Length > 0)
                outputArea.RemoveChild(outputArea.Children[0]);


            outputArea.AppendChild(new HTMLHeadingElement(HeadingType.H2) { TextContent = "Impossible combination!" });

            outputArea.AppendChild(new HTMLHeadingElement(HeadingType.H3) { TextContent = "Whoops." });
            outputArea.AppendChild(new HTMLParagraphElement() { TextContent = "It's impossible to generate that kind of quilt with that many types of tile (without two the same touching). You need to either come up with more types of tile, or change to a different quilt type." });

        }
        static void doGenerate(object sender)
        {
            width = int.Parse(widthInput.Value);
            height = int.Parse(heightInput.Value);
            typeCount = int.Parse(squareTypeInput.Value);

            values = new int[width, height];
            for (int x = 0; x < width; x++)
                for (int y = 0; y < height; y++)
                    values[x, y] = -1;

            Random r = new Random();
            for (int x = 0; x < width; x++)
            {
                for (int y = 0; y < height; y++)
                {
                    var p = possibilities(x, y);
                    if (p.Length == 0)
                    {
                        outputImpossible();
                        return;
                    }
                    else
                        values[x, y] = p[r.Next(0, p.Length)];


                }

            }
            output();
            outputCounts();
        }

        static int width;
        static int height;
        static int typeCount;
        static int[,] values;
        static int[] hexPossibilities(int x, int y)
        {
            List<int> toRemove = new List<int>();
            bool offset = y % 2 == 0;
            if (x > 0)
                if (values[x - 1, y] != -1)
                    toRemove.Add(values[x - 1, y]);
            if (x < width - 1)
                if (values[x + 1, y] != -1)
                    toRemove.Add(values[x + 1, y]);
            if (y > 0)
                if (values[x, y - 1] != -1)
                    toRemove.Add(values[x, y - 1]);
            if (y < height - 1)
                if (values[x, y + 1] != -1)
                    toRemove.Add(values[x, y + 1]);
            if (offset)
            {
                if (y > 0 && x < width - 1)
                    if (values[x + 1, y - 1] != -1)
                        toRemove.Add(values[x + 1, y - 1]);
                if (y < height - 1 && x < width - 1)
                    if (values[x + 1, y + 1] != -1)
                        toRemove.Add(values[x + 1, y + 1]);
            }
            else
            {
                if (y > 0 && x >0)
                    if (values[x - 1, y - 1] != -1)
                        toRemove.Add(values[x - 1, y - 1]);
                if (y < height - 1 && x > 0)
                    if (values[x - 1, y + 1] != -1)
                        toRemove.Add(values[x - 1, y + 1]);
            }
            List<int> output = new List<int>();
            for (int i = 0; i < typeCount; i++)
                if (!toRemove.Contains(i))
                    output.Add(i);
            return output.ToArray();
        }
        static int[] possibilities(int x, int y)
        {
            List<int> toRemove = new List<int>();
            if (x > 0)
                if (values[x - 1, y] != -1)
                    toRemove.Add(values[x - 1, y]);
            if (x < width - 1)
                if (values[x + 1, y] != -1)
                    toRemove.Add(values[x + 1, y]);
            if (y > 0)
                if (values[x, y - 1] != -1)
                    toRemove.Add(values[x, y - 1]);
            if (y < height - 1)
                if (values[x, y + 1] != -1)
                    toRemove.Add(values[x, y + 1]);
            List<int> output = new List<int>();
            for (int i = 0; i < typeCount; i++)
                if (!toRemove.Contains(i))
                    output.Add(i);
            return output.ToArray();
        }
    }
}