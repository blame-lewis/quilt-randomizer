/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2018
 * @compiler Bridge.NET 17.3.0
 */
Bridge.assembly("QuiltRandomizerWeb", function ($asm, globals) {
    "use strict";

    Bridge.define("QuiltRandomizerWeb.App", {
        main: function Main () {
            var $t;
            document.body.style.fontFamily = "Helvetica";
            document.body.style.backgroundColor = "#ddd";
            document.body.style.color = "#666";
            document.body.style.fontSize = "25pt";
            document.body.style.textAlign = "center";

            var controlsTable = document.createElement("table");
            var widthRow = controlsTable.insertRow(0);
            var heightRow = controlsTable.insertRow(1);
            var typesRow = controlsTable.insertRow(2);
            controlsTable.style.display = "inline-block";

            var heading = document.createElement("h1");
            heading.style.color = "#222";
            heading.textContent = "Quilt Randomizer";
            heading.style.fontSize = "50pt";
            QuiltRandomizerWeb.App.widthInput = document.createElement("input");
            QuiltRandomizerWeb.App.widthInput.type = "number";
            QuiltRandomizerWeb.App.widthInput.value = "10";
            QuiltRandomizerWeb.App.widthInput.style.fontSize = "20pt";
            QuiltRandomizerWeb.App.heightInput = document.createElement("input");
            QuiltRandomizerWeb.App.heightInput.type = "number";
            QuiltRandomizerWeb.App.heightInput.value = "10";
            QuiltRandomizerWeb.App.heightInput.style.fontSize = "20pt";
            QuiltRandomizerWeb.App.squareTypeInput = document.createElement("input");
            QuiltRandomizerWeb.App.squareTypeInput.type = "number";
            QuiltRandomizerWeb.App.squareTypeInput.value = "10";
            QuiltRandomizerWeb.App.squareTypeInput.style.fontSize = "20pt";
            QuiltRandomizerWeb.App.outputArea = document.createElement("div");
            QuiltRandomizerWeb.App.outputArea.style.backgroundColor = "#eee";
            QuiltRandomizerWeb.App.outputArea.style.padding = "10px";
            QuiltRandomizerWeb.App.outputArea.style.display = "inline-block";
            QuiltRandomizerWeb.App.outputArea.style.border = "1px solid";

            QuiltRandomizerWeb.App.countArea = document.createElement("div");
            QuiltRandomizerWeb.App.countArea.style.backgroundColor = "#eee";
            QuiltRandomizerWeb.App.countArea.style.padding = "10px";
            QuiltRandomizerWeb.App.countArea.style.display = "inline-block";
            QuiltRandomizerWeb.App.countArea.style.border = "1px solid";

            document.title = "Quilt Randomizer";
            document.body.appendChild(heading);
            widthRow.appendChild(($t = document.createElement("td"), $t.innerHTML = "Width: ", $t));
            widthRow.children[0].style.textAlign = "right";
            widthRow.appendChild(document.createElement("td").appendChild(QuiltRandomizerWeb.App.widthInput));
            heightRow.appendChild(($t = document.createElement("td"), $t.innerHTML = "Height: ", $t));
            heightRow.children[0].style.textAlign = "right";
            heightRow.appendChild(document.createElement("td").appendChild(QuiltRandomizerWeb.App.heightInput));
            typesRow.appendChild(($t = document.createElement("td"), $t.innerHTML = "How many types of tile: ", $t));
            typesRow.children[0].style.textAlign = "right";
            typesRow.appendChild(document.createElement("td").appendChild(QuiltRandomizerWeb.App.squareTypeInput));
            document.body.appendChild(controlsTable);

            document.body.appendChild(document.createElement("br"));
            var generate = document.createElement("button");
            generate.textContent = "Generate Square";
            generate.style.fontSize = "20pt";
            generate.onclick = QuiltRandomizerWeb.App.doGenerate;
            document.body.appendChild(generate);
            document.body.appendChild(($t = document.createElement("span"), $t.innerHTML = "&nbsp;&nbsp;", $t));
            var generateHex = document.createElement("button");
            generateHex.textContent = "Generate Hex";
            generateHex.style.fontSize = "20pt";
            generateHex.onclick = QuiltRandomizerWeb.App.doGenerateHex;
            document.body.appendChild(generateHex);
            document.body.appendChild(($t = document.createElement("span"), $t.innerHTML = "&nbsp;&nbsp;", $t));
            var getHelp = document.createElement("button");
            getHelp.textContent = "Help!";
            getHelp.style.fontSize = "20pt";
            getHelp.onclick = QuiltRandomizerWeb.App.help;
            document.body.appendChild(getHelp);
            document.body.appendChild(document.createElement("br"));

            document.body.appendChild(document.createElement("br"));
            document.body.appendChild(QuiltRandomizerWeb.App.outputArea);

            document.body.appendChild(document.createElement("br"));

            document.body.appendChild(QuiltRandomizerWeb.App.countArea);
            QuiltRandomizerWeb.App.help(null);
        },
        statics: {
            fields: {
                heightInput: null,
                widthInput: null,
                squareTypeInput: null,
                outputArea: null,
                countArea: null,
                width: 0,
                height: 0,
                typeCount: 0,
                values: null
            },
            methods: {
                getColor: function (id) {
                    var r = new System.Random.$ctor1(id);
                    var red = Bridge.Int.clip32(r.Next$1(256) * 0.85);
                    var green = Bridge.Int.clip32(r.Next$1(256) * 0.85);
                    var blue = Bridge.Int.clip32(r.Next$1(256) * 0.85);
                    return "#" + (red.toString(16) || "") + (green.toString(16) || "") + (blue.toString(16) || "");
                },
                help: function (sender) {
                    var $t;
                    while (QuiltRandomizerWeb.App.outputArea.children.length > 0) {
                        QuiltRandomizerWeb.App.outputArea.removeChild(QuiltRandomizerWeb.App.outputArea.children[0]);
                    }

                    QuiltRandomizerWeb.App.outputArea.appendChild(($t = document.createElement("h2"), $t.textContent = "Quilt Randomizer - Help!", $t));

                    QuiltRandomizerWeb.App.outputArea.appendChild(($t = document.createElement("h3"), $t.textContent = "What does it do?", $t));
                    QuiltRandomizerWeb.App.outputArea.appendChild(($t = document.createElement("p"), $t.textContent = "The Quilt Randomizer is a simple way to generate unique and random quilt tilings that do not have two tiles the same touching. All you have to do is enter in the dimensions (width and height) in number of tiles, enter in the number of different tile types you want to place, and it will do the rest.", $t));

                    QuiltRandomizerWeb.App.outputArea.appendChild(($t = document.createElement("h3"), $t.textContent = "What do the colours mean?", $t));
                    QuiltRandomizerWeb.App.outputArea.appendChild(($t = document.createElement("p"), $t.textContent = "They're just there to make it easier to read.", $t));

                    QuiltRandomizerWeb.App.outputArea.appendChild(($t = document.createElement("h3"), $t.textContent = "How can I save a pattern?", $t));
                    QuiltRandomizerWeb.App.outputArea.appendChild(($t = document.createElement("p"), $t.textContent = "Just go file->save in your browser. Some browsers seem to mess the page up a bit but you should still be able to read it.", $t));
                },
                output: function () {
                    var $t;
                    while (QuiltRandomizerWeb.App.outputArea.children.length > 0) {
                        QuiltRandomizerWeb.App.outputArea.removeChild(QuiltRandomizerWeb.App.outputArea.children[0]);
                    }

                    var table = QuiltRandomizerWeb.App.outputArea.appendChild(document.createElement("table"));
                    Bridge.cast(table, HTMLTableElement).style.minHeight = System.Double.format((QuiltRandomizerWeb.App.height * 1.5)) + "em";

                    for (var y = 0; y < QuiltRandomizerWeb.App.height; y = (y + 1) | 0) {
                        var row = table.appendChild(document.createElement("tr"));

                        for (var x = 0; x < QuiltRandomizerWeb.App.width; x = (x + 1) | 0) {
                            var v = ($t = document.createElement("td"), $t.textContent = Bridge.toString((((QuiltRandomizerWeb.App.values.get([x, y]) + 1) | 0))), $t);
                            v.style.padding = "10px";
                            v.style.color = QuiltRandomizerWeb.App.getColor(((QuiltRandomizerWeb.App.values.get([x, y]) + 1) | 0));
                            v.style.minWidth = "1.3em";
                            row.appendChild(v);
                        }

                    }
                },
                outputCounts: function () {
                    var $t, $t1;
                    var total = 0;
                    var counts = System.Array.init(QuiltRandomizerWeb.App.typeCount, 0, System.Int32);
                    $t = Bridge.getEnumerator(QuiltRandomizerWeb.App.values);
                    try {
                        while ($t.moveNext()) {
                            var i = $t.Current;
                            counts[System.Array.index(i, counts)] = (counts[System.Array.index(i, counts)] + 1) | 0;
                            total = (total + 1) | 0;
                        }
                    } finally {
                        if (Bridge.is($t, System.IDisposable)) {
                            $t.System$IDisposable$Dispose();
                        }
                    }

                    while (QuiltRandomizerWeb.App.countArea.children.length > 0) {
                        QuiltRandomizerWeb.App.countArea.removeChild(QuiltRandomizerWeb.App.countArea.children[0]);
                    }
                    QuiltRandomizerWeb.App.countArea.appendChild(($t1 = document.createElement("h2"), $t1.innerHTML = "Quantities Needed", $t1));

                    for (var i1 = 0; i1 < counts.length; i1 = (i1 + 1) | 0) {
                        var p = ($t1 = document.createElement("p"), $t1.innerHTML = System.String.format("Type {0} Tiles: {1} needed.", Bridge.box(((i1 + 1) | 0), System.Int32), Bridge.box(counts[System.Array.index(i1, counts)], System.Int32)), $t1);
                        p.style.color = QuiltRandomizerWeb.App.getColor(((i1 + 1) | 0));
                        QuiltRandomizerWeb.App.countArea.appendChild(p);
                    }
                    QuiltRandomizerWeb.App.countArea.appendChild(($t1 = document.createElement("p"), $t1.innerHTML = System.String.format("Total needed: {0}.", [Bridge.box(total, System.Int32)]), $t1));
                },
                outputHex: function () {
                    var $t;
                    while (QuiltRandomizerWeb.App.outputArea.children.length > 0) {
                        QuiltRandomizerWeb.App.outputArea.removeChild(QuiltRandomizerWeb.App.outputArea.children[0]);
                    }

                    var table = QuiltRandomizerWeb.App.outputArea.appendChild(document.createElement("table"));
                    Bridge.cast(table, HTMLTableElement).style.minHeight = System.Double.format((QuiltRandomizerWeb.App.height * 1.5)) + "em";
                    for (var y = 0; y < QuiltRandomizerWeb.App.height; y = (y + 1) | 0) {
                        var row = table.appendChild(document.createElement("tr"));

                        if (y % 2 === 0) {
                            Bridge.cast(row, HTMLTableRowElement).style.transform = "translate(0.45em)";
                        } else {
                            Bridge.cast(row, HTMLTableRowElement).style.transform = "translate(-0.45em)";
                        }
                        for (var x = 0; x < QuiltRandomizerWeb.App.width; x = (x + 1) | 0) {
                            var v = ($t = document.createElement("td"), $t.textContent = Bridge.toString((((QuiltRandomizerWeb.App.values.get([x, y]) + 1) | 0))), $t);
                            v.style.padding = "10px";
                            v.style.color = QuiltRandomizerWeb.App.getColor(((QuiltRandomizerWeb.App.values.get([x, y]) + 1) | 0));
                            v.style.minWidth = "1.3em";
                            row.appendChild(v);
                        }

                    }

                },
                doGenerateHex: function (sender) {
                    QuiltRandomizerWeb.App.width = System.Int32.parse(QuiltRandomizerWeb.App.widthInput.value);
                    QuiltRandomizerWeb.App.height = System.Int32.parse(QuiltRandomizerWeb.App.heightInput.value);
                    QuiltRandomizerWeb.App.typeCount = System.Int32.parse(QuiltRandomizerWeb.App.squareTypeInput.value);

                    QuiltRandomizerWeb.App.values = System.Array.create(0, null, System.Int32, QuiltRandomizerWeb.App.width, QuiltRandomizerWeb.App.height);
                    for (var x = 0; x < QuiltRandomizerWeb.App.width; x = (x + 1) | 0) {
                        for (var y = 0; y < QuiltRandomizerWeb.App.height; y = (y + 1) | 0) {
                            QuiltRandomizerWeb.App.values.set([x, y], -1);
                        }
                    }

                    var r = new System.Random.ctor();
                    for (var x1 = 0; x1 < QuiltRandomizerWeb.App.width; x1 = (x1 + 1) | 0) {
                        for (var y1 = 0; y1 < QuiltRandomizerWeb.App.height; y1 = (y1 + 1) | 0) {
                            var p = QuiltRandomizerWeb.App.hexPossibilities(x1, y1);
                            if (p.length === 0) {
                                QuiltRandomizerWeb.App.outputImpossible();
                                return;
                            } else {
                                QuiltRandomizerWeb.App.values.set([x1, y1], p[System.Array.index(r.Next$2(0, p.length), p)]);
                            }
                        }

                    }
                    QuiltRandomizerWeb.App.outputHex();
                    QuiltRandomizerWeb.App.outputCounts();
                },
                outputImpossible: function () {
                    var $t;
                    while (QuiltRandomizerWeb.App.outputArea.children.length > 0) {
                        QuiltRandomizerWeb.App.outputArea.removeChild(QuiltRandomizerWeb.App.outputArea.children[0]);
                    }


                    QuiltRandomizerWeb.App.outputArea.appendChild(($t = document.createElement("h2"), $t.textContent = "Impossible combination!", $t));

                    QuiltRandomizerWeb.App.outputArea.appendChild(($t = document.createElement("h3"), $t.textContent = "Whoops.", $t));
                    QuiltRandomizerWeb.App.outputArea.appendChild(($t = document.createElement("p"), $t.textContent = "It's impossible to generate that kind of quilt with that many types of tile (without two the same touching). You need to either come up with more types of tile, or change to a different quilt type.", $t));

                },
                doGenerate: function (sender) {
                    QuiltRandomizerWeb.App.width = System.Int32.parse(QuiltRandomizerWeb.App.widthInput.value);
                    QuiltRandomizerWeb.App.height = System.Int32.parse(QuiltRandomizerWeb.App.heightInput.value);
                    QuiltRandomizerWeb.App.typeCount = System.Int32.parse(QuiltRandomizerWeb.App.squareTypeInput.value);

                    QuiltRandomizerWeb.App.values = System.Array.create(0, null, System.Int32, QuiltRandomizerWeb.App.width, QuiltRandomizerWeb.App.height);
                    for (var x = 0; x < QuiltRandomizerWeb.App.width; x = (x + 1) | 0) {
                        for (var y = 0; y < QuiltRandomizerWeb.App.height; y = (y + 1) | 0) {
                            QuiltRandomizerWeb.App.values.set([x, y], -1);
                        }
                    }

                    var r = new System.Random.ctor();
                    for (var x1 = 0; x1 < QuiltRandomizerWeb.App.width; x1 = (x1 + 1) | 0) {
                        for (var y1 = 0; y1 < QuiltRandomizerWeb.App.height; y1 = (y1 + 1) | 0) {
                            var p = QuiltRandomizerWeb.App.possibilities(x1, y1);
                            if (p.length === 0) {
                                QuiltRandomizerWeb.App.outputImpossible();
                                return;
                            } else {
                                QuiltRandomizerWeb.App.values.set([x1, y1], p[System.Array.index(r.Next$2(0, p.length), p)]);
                            }


                        }

                    }
                    QuiltRandomizerWeb.App.output();
                    QuiltRandomizerWeb.App.outputCounts();
                },
                hexPossibilities: function (x, y) {
                    var toRemove = new (System.Collections.Generic.List$1(System.Int32)).ctor();
                    var offset = y % 2 === 0;
                    if (x > 0) {
                        if (QuiltRandomizerWeb.App.values.get([((x - 1) | 0), y]) !== -1) {
                            toRemove.add(QuiltRandomizerWeb.App.values.get([((x - 1) | 0), y]));
                        }
                    }
                    if (x < ((QuiltRandomizerWeb.App.width - 1) | 0)) {
                        if (QuiltRandomizerWeb.App.values.get([((x + 1) | 0), y]) !== -1) {
                            toRemove.add(QuiltRandomizerWeb.App.values.get([((x + 1) | 0), y]));
                        }
                    }
                    if (y > 0) {
                        if (QuiltRandomizerWeb.App.values.get([x, ((y - 1) | 0)]) !== -1) {
                            toRemove.add(QuiltRandomizerWeb.App.values.get([x, ((y - 1) | 0)]));
                        }
                    }
                    if (y < ((QuiltRandomizerWeb.App.height - 1) | 0)) {
                        if (QuiltRandomizerWeb.App.values.get([x, ((y + 1) | 0)]) !== -1) {
                            toRemove.add(QuiltRandomizerWeb.App.values.get([x, ((y + 1) | 0)]));
                        }
                    }
                    if (offset) {
                        if (y > 0 && x < ((QuiltRandomizerWeb.App.width - 1) | 0)) {
                            if (QuiltRandomizerWeb.App.values.get([((x + 1) | 0), ((y - 1) | 0)]) !== -1) {
                                toRemove.add(QuiltRandomizerWeb.App.values.get([((x + 1) | 0), ((y - 1) | 0)]));
                            }
                        }
                        if (y < ((QuiltRandomizerWeb.App.height - 1) | 0) && x < ((QuiltRandomizerWeb.App.width - 1) | 0)) {
                            if (QuiltRandomizerWeb.App.values.get([((x + 1) | 0), ((y + 1) | 0)]) !== -1) {
                                toRemove.add(QuiltRandomizerWeb.App.values.get([((x + 1) | 0), ((y + 1) | 0)]));
                            }
                        }
                    } else {
                        if (y > 0 && x > 0) {
                            if (QuiltRandomizerWeb.App.values.get([((x - 1) | 0), ((y - 1) | 0)]) !== -1) {
                                toRemove.add(QuiltRandomizerWeb.App.values.get([((x - 1) | 0), ((y - 1) | 0)]));
                            }
                        }
                        if (y < ((QuiltRandomizerWeb.App.height - 1) | 0) && x > 0) {
                            if (QuiltRandomizerWeb.App.values.get([((x - 1) | 0), ((y + 1) | 0)]) !== -1) {
                                toRemove.add(QuiltRandomizerWeb.App.values.get([((x - 1) | 0), ((y + 1) | 0)]));
                            }
                        }
                    }
                    var output = new (System.Collections.Generic.List$1(System.Int32)).ctor();
                    for (var i = 0; i < QuiltRandomizerWeb.App.typeCount; i = (i + 1) | 0) {
                        if (!toRemove.contains(i)) {
                            output.add(i);
                        }
                    }
                    return output.ToArray();
                },
                possibilities: function (x, y) {
                    var toRemove = new (System.Collections.Generic.List$1(System.Int32)).ctor();
                    if (x > 0) {
                        if (QuiltRandomizerWeb.App.values.get([((x - 1) | 0), y]) !== -1) {
                            toRemove.add(QuiltRandomizerWeb.App.values.get([((x - 1) | 0), y]));
                        }
                    }
                    if (x < ((QuiltRandomizerWeb.App.width - 1) | 0)) {
                        if (QuiltRandomizerWeb.App.values.get([((x + 1) | 0), y]) !== -1) {
                            toRemove.add(QuiltRandomizerWeb.App.values.get([((x + 1) | 0), y]));
                        }
                    }
                    if (y > 0) {
                        if (QuiltRandomizerWeb.App.values.get([x, ((y - 1) | 0)]) !== -1) {
                            toRemove.add(QuiltRandomizerWeb.App.values.get([x, ((y - 1) | 0)]));
                        }
                    }
                    if (y < ((QuiltRandomizerWeb.App.height - 1) | 0)) {
                        if (QuiltRandomizerWeb.App.values.get([x, ((y + 1) | 0)]) !== -1) {
                            toRemove.add(QuiltRandomizerWeb.App.values.get([x, ((y + 1) | 0)]));
                        }
                    }
                    var output = new (System.Collections.Generic.List$1(System.Int32)).ctor();
                    for (var i = 0; i < QuiltRandomizerWeb.App.typeCount; i = (i + 1) | 0) {
                        if (!toRemove.contains(i)) {
                            output.add(i);
                        }
                    }
                    return output.ToArray();
                }
            }
        }
    });
});

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJRdWlsdFJhbmRvbWl6ZXJXZWIuanMiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbIkFwcC5jcyJdLAogICJuYW1lcyI6IFsiIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7WUF5QllBO1lBQ0FBO1lBQ0FBO1lBQ0FBO1lBQ0FBOztZQUVBQSxvQkFBaUNBO1lBQ2pDQSxlQUErQkE7WUFDL0JBLGdCQUFnQ0E7WUFDaENBLGVBQStCQTtZQUMvQkE7O1lBRUFBLGNBQTZCQSx1QkFBdUJBO1lBQ3BEQTtZQUNBQTtZQUNBQTtZQUNBQSxvQ0FBYUE7WUFDYkEseUNBQWtCQTtZQUNsQkE7WUFDQUE7WUFDQUEscUNBQWNBO1lBQ2RBLDBDQUFtQkE7WUFDbkJBO1lBQ0FBO1lBQ0FBLHlDQUFrQkE7WUFDbEJBLDhDQUF1QkE7WUFDdkJBO1lBQ0FBO1lBQ0FBLG9DQUFhQTtZQUNiQTtZQUNBQTtZQUNBQTtZQUNBQTs7WUFFQUEsbUNBQVlBO1lBQ1pBO1lBQ0FBO1lBQ0FBO1lBQ0FBOztZQUVBQTtZQUNBQSwwQkFBMEJBO1lBQzFCQSxxQkFBcUJBO1lBQ3JCQTtZQUNBQSxxQkFBcUJBLHlDQUEyQ0E7WUFDaEVBLHNCQUFzQkE7WUFDdEJBO1lBQ0FBLHNCQUFzQkEseUNBQTJDQTtZQUNqRUEscUJBQXFCQTtZQUNyQkE7WUFDQUEscUJBQXFCQSx5Q0FBMkNBO1lBQ2hFQSwwQkFBMEJBOztZQUUxQkEsMEJBQTBCQTtZQUMxQkEsZUFBNkJBO1lBQzdCQTtZQUNBQTtZQUNBQSxtQkFBbUJBLEFBQTBDQTtZQUM3REEsMEJBQTBCQTtZQUMxQkEsMEJBQTBCQTtZQUMxQkEsa0JBQWdDQTtZQUNoQ0E7WUFDQUE7WUFDQUEsc0JBQXNCQSxBQUEwQ0E7WUFDaEVBLDBCQUEwQkE7WUFDMUJBLDBCQUEwQkE7WUFDMUJBLGNBQTRCQTtZQUM1QkE7WUFDQUE7WUFDQUEsa0JBQWtCQSxBQUEwQ0E7WUFDNURBLDBCQUEwQkE7WUFDMUJBLDBCQUEwQkE7O1lBRTFC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b3VyY2VzQ29udGVudCI6IFsidXNpbmcgQnJpZGdlO1xyXG51c2luZyBOZXd0b25zb2Z0Lkpzb247XHJcbnVzaW5nIFN5c3RlbTtcclxudXNpbmcgQnJpZGdlLkh0bWw1O1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxuXHJcbm5hbWVzcGFjZSBRdWlsdFJhbmRvbWl6ZXJXZWJcclxue1xyXG4gICAgcHVibGljIGNsYXNzIEFwcFxyXG4gICAge1xyXG4gICAgICAgIHN0YXRpYyBIVE1MSW5wdXRFbGVtZW50IGhlaWdodElucHV0O1xyXG4gICAgICAgIHN0YXRpYyBIVE1MSW5wdXRFbGVtZW50IHdpZHRoSW5wdXQ7XHJcbiAgICAgICAgc3RhdGljIEhUTUxJbnB1dEVsZW1lbnQgc3F1YXJlVHlwZUlucHV0O1xyXG4gICAgICAgIHN0YXRpYyBIVE1MRGl2RWxlbWVudCBvdXRwdXRBcmVhO1xyXG4gICAgICAgIHN0YXRpYyBIVE1MRGl2RWxlbWVudCBjb3VudEFyZWE7XHJcbiAgICAgICAgc3RhdGljIHN0cmluZyBnZXRDb2xvcihpbnQgaWQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBSYW5kb20gciA9IG5ldyBSYW5kb20oaWQpO1xyXG4gICAgICAgICAgICBpbnQgcmVkID0gKGludCkoci5OZXh0KDI1NikqIDAuODUpO1xyXG4gICAgICAgICAgICBpbnQgZ3JlZW4gPSAoaW50KShyLk5leHQoMjU2KSAqIDAuODUpO1xyXG4gICAgICAgICAgICBpbnQgYmx1ZSA9IChpbnQpKHIuTmV4dCgyNTYpICogMC44NSk7XHJcbiAgICAgICAgICAgIHJldHVybiBcIiNcIiArIHJlZC5Ub1N0cmluZygxNikgKyBncmVlbi5Ub1N0cmluZygxNikgKyBibHVlLlRvU3RyaW5nKDE2KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIE1haW4oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgRG9jdW1lbnQuQm9keS5TdHlsZS5Gb250RmFtaWx5ID0gXCJIZWx2ZXRpY2FcIjtcclxuICAgICAgICAgICAgRG9jdW1lbnQuQm9keS5TdHlsZS5CYWNrZ3JvdW5kQ29sb3IgPSBcIiNkZGRcIjtcclxuICAgICAgICAgICAgRG9jdW1lbnQuQm9keS5TdHlsZS5Db2xvciA9IFwiIzY2NlwiO1xyXG4gICAgICAgICAgICBEb2N1bWVudC5Cb2R5LlN0eWxlLkZvbnRTaXplID0gXCIyNXB0XCI7XHJcbiAgICAgICAgICAgIERvY3VtZW50LkJvZHkuU3R5bGUuVGV4dEFsaWduID0gXCJjZW50ZXJcIjtcclxuXHJcbiAgICAgICAgICAgIEhUTUxUYWJsZUVsZW1lbnQgY29udHJvbHNUYWJsZSA9IG5ldyBIVE1MVGFibGVFbGVtZW50KCk7XHJcbiAgICAgICAgICAgIEhUTUxUYWJsZVJvd0VsZW1lbnQgd2lkdGhSb3cgPSBjb250cm9sc1RhYmxlLkluc2VydFJvdygwKTtcclxuICAgICAgICAgICAgSFRNTFRhYmxlUm93RWxlbWVudCBoZWlnaHRSb3cgPSBjb250cm9sc1RhYmxlLkluc2VydFJvdygxKTtcclxuICAgICAgICAgICAgSFRNTFRhYmxlUm93RWxlbWVudCB0eXBlc1JvdyA9IGNvbnRyb2xzVGFibGUuSW5zZXJ0Um93KDIpO1xyXG4gICAgICAgICAgICBjb250cm9sc1RhYmxlLlN0eWxlLkRpc3BsYXkgPSBcImlubGluZS1ibG9ja1wiO1xyXG5cclxuICAgICAgICAgICAgSFRNTEhlYWRpbmdFbGVtZW50IGhlYWRpbmcgPSBuZXcgSFRNTEhlYWRpbmdFbGVtZW50KEhlYWRpbmdUeXBlLkgxKTtcclxuICAgICAgICAgICAgaGVhZGluZy5TdHlsZS5Db2xvciA9IFwiIzIyMlwiO1xyXG4gICAgICAgICAgICBoZWFkaW5nLlRleHRDb250ZW50ID0gXCJRdWlsdCBSYW5kb21pemVyXCI7XHJcbiAgICAgICAgICAgIGhlYWRpbmcuU3R5bGUuRm9udFNpemUgPSBcIjUwcHRcIjtcclxuICAgICAgICAgICAgd2lkdGhJbnB1dCA9IG5ldyBIVE1MSW5wdXRFbGVtZW50KCk7XHJcbiAgICAgICAgICAgIHdpZHRoSW5wdXQuVHlwZSA9IElucHV0VHlwZS5OdW1iZXI7XHJcbiAgICAgICAgICAgIHdpZHRoSW5wdXQuVmFsdWUgPSBcIjEwXCI7XHJcbiAgICAgICAgICAgIHdpZHRoSW5wdXQuU3R5bGUuRm9udFNpemUgPSBcIjIwcHRcIjtcclxuICAgICAgICAgICAgaGVpZ2h0SW5wdXQgPSBuZXcgSFRNTElucHV0RWxlbWVudCgpO1xyXG4gICAgICAgICAgICBoZWlnaHRJbnB1dC5UeXBlID0gSW5wdXRUeXBlLk51bWJlcjtcclxuICAgICAgICAgICAgaGVpZ2h0SW5wdXQuVmFsdWUgPSBcIjEwXCI7XHJcbiAgICAgICAgICAgIGhlaWdodElucHV0LlN0eWxlLkZvbnRTaXplID0gXCIyMHB0XCI7XHJcbiAgICAgICAgICAgIHNxdWFyZVR5cGVJbnB1dCA9IG5ldyBIVE1MSW5wdXRFbGVtZW50KCk7XHJcbiAgICAgICAgICAgIHNxdWFyZVR5cGVJbnB1dC5UeXBlID0gSW5wdXRUeXBlLk51bWJlcjtcclxuICAgICAgICAgICAgc3F1YXJlVHlwZUlucHV0LlZhbHVlID0gXCIxMFwiO1xyXG4gICAgICAgICAgICBzcXVhcmVUeXBlSW5wdXQuU3R5bGUuRm9udFNpemUgPSBcIjIwcHRcIjtcclxuICAgICAgICAgICAgb3V0cHV0QXJlYSA9IG5ldyBIVE1MRGl2RWxlbWVudCgpO1xyXG4gICAgICAgICAgICBvdXRwdXRBcmVhLlN0eWxlLkJhY2tncm91bmRDb2xvciA9IFwiI2VlZVwiO1xyXG4gICAgICAgICAgICBvdXRwdXRBcmVhLlN0eWxlLlBhZGRpbmcgPSBcIjEwcHhcIjtcclxuICAgICAgICAgICAgb3V0cHV0QXJlYS5TdHlsZS5EaXNwbGF5ID0gXCJpbmxpbmUtYmxvY2tcIjtcclxuICAgICAgICAgICAgb3V0cHV0QXJlYS5TdHlsZS5Cb3JkZXIgPSBcIjFweCBzb2xpZFwiO1xyXG5cclxuICAgICAgICAgICAgY291bnRBcmVhID0gbmV3IEhUTUxEaXZFbGVtZW50KCk7XHJcbiAgICAgICAgICAgIGNvdW50QXJlYS5TdHlsZS5CYWNrZ3JvdW5kQ29sb3IgPSBcIiNlZWVcIjtcclxuICAgICAgICAgICAgY291bnRBcmVhLlN0eWxlLlBhZGRpbmcgPSBcIjEwcHhcIjtcclxuICAgICAgICAgICAgY291bnRBcmVhLlN0eWxlLkRpc3BsYXkgPSBcImlubGluZS1ibG9ja1wiO1xyXG4gICAgICAgICAgICBjb3VudEFyZWEuU3R5bGUuQm9yZGVyID0gXCIxcHggc29saWRcIjtcclxuXHJcbiAgICAgICAgICAgIERvY3VtZW50LlRpdGxlID0gXCJRdWlsdCBSYW5kb21pemVyXCI7XHJcbiAgICAgICAgICAgIERvY3VtZW50LkJvZHkuQXBwZW5kQ2hpbGQoaGVhZGluZyk7XHJcbiAgICAgICAgICAgIHdpZHRoUm93LkFwcGVuZENoaWxkKG5ldyBIVE1MVGFibGVEYXRhQ2VsbEVsZW1lbnQoKSB7IElubmVySFRNTCA9IFwiV2lkdGg6IFwiIH0pO1xyXG4gICAgICAgICAgICB3aWR0aFJvdy5DaGlsZHJlblswXS5TdHlsZS5UZXh0QWxpZ24gPSBcInJpZ2h0XCI7XHJcbiAgICAgICAgICAgIHdpZHRoUm93LkFwcGVuZENoaWxkKG5ldyBIVE1MVGFibGVEYXRhQ2VsbEVsZW1lbnQoKS5BcHBlbmRDaGlsZCh3aWR0aElucHV0KSk7XHJcbiAgICAgICAgICAgIGhlaWdodFJvdy5BcHBlbmRDaGlsZChuZXcgSFRNTFRhYmxlRGF0YUNlbGxFbGVtZW50KCkgeyBJbm5lckhUTUwgPSBcIkhlaWdodDogXCIgfSk7XHJcbiAgICAgICAgICAgIGhlaWdodFJvdy5DaGlsZHJlblswXS5TdHlsZS5UZXh0QWxpZ24gPSBcInJpZ2h0XCI7XHJcbiAgICAgICAgICAgIGhlaWdodFJvdy5BcHBlbmRDaGlsZChuZXcgSFRNTFRhYmxlRGF0YUNlbGxFbGVtZW50KCkuQXBwZW5kQ2hpbGQoaGVpZ2h0SW5wdXQpKTtcclxuICAgICAgICAgICAgdHlwZXNSb3cuQXBwZW5kQ2hpbGQobmV3IEhUTUxUYWJsZURhdGFDZWxsRWxlbWVudCgpIHsgSW5uZXJIVE1MID0gXCJIb3cgbWFueSB0eXBlcyBvZiB0aWxlOiBcIiB9KTtcclxuICAgICAgICAgICAgdHlwZXNSb3cuQ2hpbGRyZW5bMF0uU3R5bGUuVGV4dEFsaWduID0gXCJyaWdodFwiO1xyXG4gICAgICAgICAgICB0eXBlc1Jvdy5BcHBlbmRDaGlsZChuZXcgSFRNTFRhYmxlRGF0YUNlbGxFbGVtZW50KCkuQXBwZW5kQ2hpbGQoc3F1YXJlVHlwZUlucHV0KSk7XHJcbiAgICAgICAgICAgIERvY3VtZW50LkJvZHkuQXBwZW5kQ2hpbGQoY29udHJvbHNUYWJsZSk7XHJcblxyXG4gICAgICAgICAgICBEb2N1bWVudC5Cb2R5LkFwcGVuZENoaWxkKG5ldyBIVE1MQlJFbGVtZW50KCkpO1xyXG4gICAgICAgICAgICBIVE1MQnV0dG9uRWxlbWVudCBnZW5lcmF0ZSA9IG5ldyBIVE1MQnV0dG9uRWxlbWVudCgpO1xyXG4gICAgICAgICAgICBnZW5lcmF0ZS5UZXh0Q29udGVudD1cIkdlbmVyYXRlIFNxdWFyZVwiO1xyXG4gICAgICAgICAgICBnZW5lcmF0ZS5TdHlsZS5Gb250U2l6ZSA9IFwiMjBwdFwiO1xyXG4gICAgICAgICAgICBnZW5lcmF0ZS5PbkNsaWNrID0gbmV3IEFjdGlvbjxNb3VzZUV2ZW50PEhUTUxCdXR0b25FbGVtZW50Pj4oZG9HZW5lcmF0ZSk7XHJcbiAgICAgICAgICAgIERvY3VtZW50LkJvZHkuQXBwZW5kQ2hpbGQoZ2VuZXJhdGUpO1xyXG4gICAgICAgICAgICBEb2N1bWVudC5Cb2R5LkFwcGVuZENoaWxkKG5ldyBIVE1MU3BhbkVsZW1lbnQoKSB7IElubmVySFRNTCA9IFwiJm5ic3A7Jm5ic3A7XCIgfSk7XHJcbiAgICAgICAgICAgIEhUTUxCdXR0b25FbGVtZW50IGdlbmVyYXRlSGV4ID0gbmV3IEhUTUxCdXR0b25FbGVtZW50KCk7XHJcbiAgICAgICAgICAgIGdlbmVyYXRlSGV4LlRleHRDb250ZW50ID0gXCJHZW5lcmF0ZSBIZXhcIjtcclxuICAgICAgICAgICAgZ2VuZXJhdGVIZXguU3R5bGUuRm9udFNpemUgPSBcIjIwcHRcIjtcclxuICAgICAgICAgICAgZ2VuZXJhdGVIZXguT25DbGljayA9IG5ldyBBY3Rpb248TW91c2VFdmVudDxIVE1MQnV0dG9uRWxlbWVudD4+KGRvR2VuZXJhdGVIZXgpO1xyXG4gICAgICAgICAgICBEb2N1bWVudC5Cb2R5LkFwcGVuZENoaWxkKGdlbmVyYXRlSGV4KTtcclxuICAgICAgICAgICAgRG9jdW1lbnQuQm9keS5BcHBlbmRDaGlsZChuZXcgSFRNTFNwYW5FbGVtZW50KCkgeyBJbm5lckhUTUwgPSBcIiZuYnNwOyZuYnNwO1wiIH0pO1xyXG4gICAgICAgICAgICBIVE1MQnV0dG9uRWxlbWVudCBnZXRIZWxwID0gbmV3IEhUTUxCdXR0b25FbGVtZW50KCk7XHJcbiAgICAgICAgICAgIGdldEhlbHAuVGV4dENvbnRlbnQgPSBcIkhlbHAhXCI7XHJcbiAgICAgICAgICAgIGdldEhlbHAuU3R5bGUuRm9udFNpemUgPSBcIjIwcHRcIjtcclxuICAgICAgICAgICAgZ2V0SGVscC5PbkNsaWNrID0gbmV3IEFjdGlvbjxNb3VzZUV2ZW50PEhUTUxCdXR0b25FbGVtZW50Pj4oaGVscCk7XHJcbiAgICAgICAgICAgIERvY3VtZW50LkJvZHkuQXBwZW5kQ2hpbGQoZ2V0SGVscCk7XHJcbiAgICAgICAgICAgIERvY3VtZW50LkJvZHkuQXBwZW5kQ2hpbGQobmV3IEhUTUxCUkVsZW1lbnQoKSk7XHJcblxyXG4gICAgICAgICAgICBEb2N1bWVudC5Cb2R5LkFwcGVuZENoaWxkKG5ldyBIVE1MQlJFbGVtZW50KCkpO1xyXG4gICAgICAgICAgICBEb2N1bWVudC5Cb2R5LkFwcGVuZENoaWxkKG91dHB1dEFyZWEpO1xyXG5cclxuICAgICAgICAgICAgRG9jdW1lbnQuQm9keS5BcHBlbmRDaGlsZChuZXcgSFRNTEJSRWxlbWVudCgpKTtcclxuXHJcbiAgICAgICAgICAgIERvY3VtZW50LkJvZHkuQXBwZW5kQ2hpbGQoY291bnRBcmVhKTtcclxuICAgICAgICAgICAgaGVscChudWxsKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc3RhdGljIHZvaWQgaGVscChvYmplY3Qgc2VuZGVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgd2hpbGUgKG91dHB1dEFyZWEuQ2hpbGRyZW4uTGVuZ3RoID4gMClcclxuICAgICAgICAgICAgICAgIG91dHB1dEFyZWEuUmVtb3ZlQ2hpbGQob3V0cHV0QXJlYS5DaGlsZHJlblswXSk7XHJcblxyXG4gICAgICAgICAgICBvdXRwdXRBcmVhLkFwcGVuZENoaWxkKG5ldyBIVE1MSGVhZGluZ0VsZW1lbnQoSGVhZGluZ1R5cGUuSDIpIHsgVGV4dENvbnRlbnQgPSBcIlF1aWx0IFJhbmRvbWl6ZXIgLSBIZWxwIVwiIH0pO1xyXG5cclxuICAgICAgICAgICAgb3V0cHV0QXJlYS5BcHBlbmRDaGlsZChuZXcgSFRNTEhlYWRpbmdFbGVtZW50KEhlYWRpbmdUeXBlLkgzKSB7IFRleHRDb250ZW50ID0gXCJXaGF0IGRvZXMgaXQgZG8/XCIgfSk7XHJcbiAgICAgICAgICAgIG91dHB1dEFyZWEuQXBwZW5kQ2hpbGQobmV3IEhUTUxQYXJhZ3JhcGhFbGVtZW50KCkgeyBUZXh0Q29udGVudCA9IFwiVGhlIFF1aWx0IFJhbmRvbWl6ZXIgaXMgYSBzaW1wbGUgd2F5IHRvIGdlbmVyYXRlIHVuaXF1ZSBhbmQgcmFuZG9tIHF1aWx0IHRpbGluZ3MgdGhhdCBkbyBub3QgaGF2ZSB0d28gdGlsZXMgdGhlIHNhbWUgdG91Y2hpbmcuIEFsbCB5b3UgaGF2ZSB0byBkbyBpcyBlbnRlciBpbiB0aGUgZGltZW5zaW9ucyAod2lkdGggYW5kIGhlaWdodCkgaW4gbnVtYmVyIG9mIHRpbGVzLCBlbnRlciBpbiB0aGUgbnVtYmVyIG9mIGRpZmZlcmVudCB0aWxlIHR5cGVzIHlvdSB3YW50IHRvIHBsYWNlLCBhbmQgaXQgd2lsbCBkbyB0aGUgcmVzdC5cIiB9KTtcclxuXHJcbiAgICAgICAgICAgIG91dHB1dEFyZWEuQXBwZW5kQ2hpbGQobmV3IEhUTUxIZWFkaW5nRWxlbWVudChIZWFkaW5nVHlwZS5IMykgeyBUZXh0Q29udGVudCA9IFwiV2hhdCBkbyB0aGUgY29sb3VycyBtZWFuP1wiIH0pO1xyXG4gICAgICAgICAgICBvdXRwdXRBcmVhLkFwcGVuZENoaWxkKG5ldyBIVE1MUGFyYWdyYXBoRWxlbWVudCgpIHsgVGV4dENvbnRlbnQgPSBcIlRoZXkncmUganVzdCB0aGVyZSB0byBtYWtlIGl0IGVhc2llciB0byByZWFkLlwiIH0pO1xyXG5cclxuICAgICAgICAgICAgb3V0cHV0QXJlYS5BcHBlbmRDaGlsZChuZXcgSFRNTEhlYWRpbmdFbGVtZW50KEhlYWRpbmdUeXBlLkgzKSB7IFRleHRDb250ZW50ID0gXCJIb3cgY2FuIEkgc2F2ZSBhIHBhdHRlcm4/XCIgfSk7XHJcbiAgICAgICAgICAgIG91dHB1dEFyZWEuQXBwZW5kQ2hpbGQobmV3IEhUTUxQYXJhZ3JhcGhFbGVtZW50KCkgeyBUZXh0Q29udGVudCA9IFwiSnVzdCBnbyBmaWxlLT5zYXZlIGluIHlvdXIgYnJvd3Nlci4gU29tZSBicm93c2VycyBzZWVtIHRvIG1lc3MgdGhlIHBhZ2UgdXAgYSBiaXQgYnV0IHlvdSBzaG91bGQgc3RpbGwgYmUgYWJsZSB0byByZWFkIGl0LlwiIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzdGF0aWMgdm9pZCBvdXRwdXQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgd2hpbGUgKG91dHB1dEFyZWEuQ2hpbGRyZW4uTGVuZ3RoID4gMClcclxuICAgICAgICAgICAgICAgIG91dHB1dEFyZWEuUmVtb3ZlQ2hpbGQob3V0cHV0QXJlYS5DaGlsZHJlblswXSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgdGFibGUgPSBvdXRwdXRBcmVhLkFwcGVuZENoaWxkKG5ldyBIVE1MVGFibGVFbGVtZW50KCkpO1xyXG4gICAgICAgICAgICAoKEhUTUxUYWJsZUVsZW1lbnQpdGFibGUpLlN0eWxlLk1pbkhlaWdodCA9IChoZWlnaHQgKiAxLjUpICsgXCJlbVwiO1xyXG5cclxuICAgICAgICAgICAgZm9yIChpbnQgeSA9IDA7IHkgPCBoZWlnaHQ7IHkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIHJvdyA9IHRhYmxlLkFwcGVuZENoaWxkKG5ldyBIVE1MVGFibGVSb3dFbGVtZW50KCkpO1xyXG5cclxuICAgICAgICAgICAgICAgIGZvciAoaW50IHggPSAwOyB4IDwgd2lkdGg7IHgrKylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdiA9IG5ldyBIVE1MVGFibGVEYXRhQ2VsbEVsZW1lbnQoKSB7IFRleHRDb250ZW50ID0gKHZhbHVlc1t4LCB5XSArIDEpLlRvU3RyaW5nKCkgfTtcclxuICAgICAgICAgICAgICAgICAgICB2LlN0eWxlLlBhZGRpbmcgPSBcIjEwcHhcIjtcclxuICAgICAgICAgICAgICAgICAgICB2LlN0eWxlLkNvbG9yID0gZ2V0Q29sb3IodmFsdWVzW3gsIHldICsgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdi5TdHlsZS5NaW5XaWR0aCA9IFwiMS4zZW1cIjtcclxuICAgICAgICAgICAgICAgICAgICByb3cuQXBwZW5kQ2hpbGQodik7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN0YXRpYyB2b2lkIG91dHB1dENvdW50cygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpbnQgdG90YWwgPSAwO1xyXG4gICAgICAgICAgICBpbnRbXSBjb3VudHMgPSBuZXcgaW50W3R5cGVDb3VudF07XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKGludCBpIGluIHZhbHVlcykge1xyXG4gICAgICAgICAgICAgICAgY291bnRzW2ldKys7XHJcbiAgICAgICAgICAgICAgICB0b3RhbCsrO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB3aGlsZSAoY291bnRBcmVhLkNoaWxkcmVuLkxlbmd0aCA+IDApXHJcbiAgICAgICAgICAgICAgICBjb3VudEFyZWEuUmVtb3ZlQ2hpbGQoY291bnRBcmVhLkNoaWxkcmVuWzBdKTtcclxuICAgICAgICAgICAgY291bnRBcmVhLkFwcGVuZENoaWxkKG5ldyBIVE1MSGVhZGluZ0VsZW1lbnQoSGVhZGluZ1R5cGUuSDIpIHsgSW5uZXJIVE1MID0gXCJRdWFudGl0aWVzIE5lZWRlZFwiIH0pO1xyXG5cclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBjb3VudHMuTGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBwID0gbmV3IEhUTUxQYXJhZ3JhcGhFbGVtZW50KCkgeyBJbm5lckhUTUwgPSBzdHJpbmcuRm9ybWF0KFwiVHlwZSB7MH0gVGlsZXM6IHsxfSBuZWVkZWQuXCIsaSsxLGNvdW50c1tpXSl9O1xyXG4gICAgICAgICAgICAgICAgcC5TdHlsZS5Db2xvciA9IGdldENvbG9yKGkrMSk7XHJcbiAgICAgICAgICAgICAgICBjb3VudEFyZWEuQXBwZW5kQ2hpbGQocCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY291bnRBcmVhLkFwcGVuZENoaWxkKG5ldyBIVE1MUGFyYWdyYXBoRWxlbWVudCgpIHsgSW5uZXJIVE1MID0gc3RyaW5nLkZvcm1hdChcIlRvdGFsIG5lZWRlZDogezB9LlwiLHRvdGFsKX0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzdGF0aWMgdm9pZCBvdXRwdXRIZXgoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgd2hpbGUgKG91dHB1dEFyZWEuQ2hpbGRyZW4uTGVuZ3RoID4gMClcclxuICAgICAgICAgICAgICAgIG91dHB1dEFyZWEuUmVtb3ZlQ2hpbGQob3V0cHV0QXJlYS5DaGlsZHJlblswXSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgdGFibGUgPSBvdXRwdXRBcmVhLkFwcGVuZENoaWxkKG5ldyBIVE1MVGFibGVFbGVtZW50KCkpO1xyXG4gICAgICAgICAgICAoKEhUTUxUYWJsZUVsZW1lbnQpdGFibGUpLlN0eWxlLk1pbkhlaWdodCA9IChoZWlnaHQgKiAxLjUpICsgXCJlbVwiO1xyXG4gICAgICAgICAgICBmb3IgKGludCB5ID0gMDsgeSA8IGhlaWdodDsgeSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcm93ID0gdGFibGUuQXBwZW5kQ2hpbGQobmV3IEhUTUxUYWJsZVJvd0VsZW1lbnQoKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHkgJSAyID09IDApXHJcbiAgICAgICAgICAgICAgICAgICAgKChIVE1MVGFibGVSb3dFbGVtZW50KXJvdykuU3R5bGUuVHJhbnNmb3JtID0gXCJ0cmFuc2xhdGUoMC40NWVtKVwiO1xyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICgoSFRNTFRhYmxlUm93RWxlbWVudClyb3cpLlN0eWxlLlRyYW5zZm9ybSA9IFwidHJhbnNsYXRlKC0wLjQ1ZW0pXCI7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGludCB4ID0gMDsgeCA8IHdpZHRoOyB4KyspXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHYgPSBuZXcgSFRNTFRhYmxlRGF0YUNlbGxFbGVtZW50KCkgeyBUZXh0Q29udGVudCA9ICh2YWx1ZXNbeCwgeV0gKyAxKS5Ub1N0cmluZygpIH07XHJcbiAgICAgICAgICAgICAgICAgICAgdi5TdHlsZS5QYWRkaW5nID0gXCIxMHB4XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgdi5TdHlsZS5Db2xvciA9IGdldENvbG9yKHZhbHVlc1t4LCB5XSArIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIHYuU3R5bGUuTWluV2lkdGggPSBcIjEuM2VtXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgcm93LkFwcGVuZENoaWxkKHYpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgc3RhdGljIHZvaWQgZG9HZW5lcmF0ZUhleChvYmplY3Qgc2VuZGVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgd2lkdGggPSBpbnQuUGFyc2Uod2lkdGhJbnB1dC5WYWx1ZSk7XHJcbiAgICAgICAgICAgIGhlaWdodCA9IGludC5QYXJzZShoZWlnaHRJbnB1dC5WYWx1ZSk7XHJcbiAgICAgICAgICAgIHR5cGVDb3VudCA9IGludC5QYXJzZShzcXVhcmVUeXBlSW5wdXQuVmFsdWUpO1xyXG5cclxuICAgICAgICAgICAgdmFsdWVzID0gbmV3IGludFt3aWR0aCwgaGVpZ2h0XTtcclxuICAgICAgICAgICAgZm9yIChpbnQgeCA9IDA7IHggPCB3aWR0aDsgeCsrKVxyXG4gICAgICAgICAgICAgICAgZm9yIChpbnQgeSA9IDA7IHkgPCBoZWlnaHQ7IHkrKylcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZXNbeCwgeV0gPSAtMTtcclxuXHJcbiAgICAgICAgICAgIFJhbmRvbSByID0gbmV3IFJhbmRvbSgpO1xyXG4gICAgICAgICAgICBmb3IgKGludCB4ID0gMDsgeCA8IHdpZHRoOyB4KyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGZvciAoaW50IHkgPSAwOyB5IDwgaGVpZ2h0OyB5KyspXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHAgPSBoZXhQb3NzaWJpbGl0aWVzKHgsIHkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwLkxlbmd0aCA9PSAwKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3V0cHV0SW1wb3NzaWJsZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVzW3gsIHldID0gcFtyLk5leHQoMCwgcC5MZW5ndGgpXTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3V0cHV0SGV4KCk7XHJcbiAgICAgICAgICAgIG91dHB1dENvdW50cygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzdGF0aWMgdm9pZCBvdXRwdXRJbXBvc3NpYmxlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHdoaWxlIChvdXRwdXRBcmVhLkNoaWxkcmVuLkxlbmd0aCA+IDApXHJcbiAgICAgICAgICAgICAgICBvdXRwdXRBcmVhLlJlbW92ZUNoaWxkKG91dHB1dEFyZWEuQ2hpbGRyZW5bMF0pO1xyXG5cclxuXHJcbiAgICAgICAgICAgIG91dHB1dEFyZWEuQXBwZW5kQ2hpbGQobmV3IEhUTUxIZWFkaW5nRWxlbWVudChIZWFkaW5nVHlwZS5IMikgeyBUZXh0Q29udGVudCA9IFwiSW1wb3NzaWJsZSBjb21iaW5hdGlvbiFcIiB9KTtcclxuXHJcbiAgICAgICAgICAgIG91dHB1dEFyZWEuQXBwZW5kQ2hpbGQobmV3IEhUTUxIZWFkaW5nRWxlbWVudChIZWFkaW5nVHlwZS5IMykgeyBUZXh0Q29udGVudCA9IFwiV2hvb3BzLlwiIH0pO1xyXG4gICAgICAgICAgICBvdXRwdXRBcmVhLkFwcGVuZENoaWxkKG5ldyBIVE1MUGFyYWdyYXBoRWxlbWVudCgpIHsgVGV4dENvbnRlbnQgPSBcIkl0J3MgaW1wb3NzaWJsZSB0byBnZW5lcmF0ZSB0aGF0IGtpbmQgb2YgcXVpbHQgd2l0aCB0aGF0IG1hbnkgdHlwZXMgb2YgdGlsZSAod2l0aG91dCB0d28gdGhlIHNhbWUgdG91Y2hpbmcpLiBZb3UgbmVlZCB0byBlaXRoZXIgY29tZSB1cCB3aXRoIG1vcmUgdHlwZXMgb2YgdGlsZSwgb3IgY2hhbmdlIHRvIGEgZGlmZmVyZW50IHF1aWx0IHR5cGUuXCIgfSk7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBzdGF0aWMgdm9pZCBkb0dlbmVyYXRlKG9iamVjdCBzZW5kZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB3aWR0aCA9IGludC5QYXJzZSh3aWR0aElucHV0LlZhbHVlKTtcclxuICAgICAgICAgICAgaGVpZ2h0ID0gaW50LlBhcnNlKGhlaWdodElucHV0LlZhbHVlKTtcclxuICAgICAgICAgICAgdHlwZUNvdW50ID0gaW50LlBhcnNlKHNxdWFyZVR5cGVJbnB1dC5WYWx1ZSk7XHJcblxyXG4gICAgICAgICAgICB2YWx1ZXMgPSBuZXcgaW50W3dpZHRoLCBoZWlnaHRdO1xyXG4gICAgICAgICAgICBmb3IgKGludCB4ID0gMDsgeCA8IHdpZHRoOyB4KyspXHJcbiAgICAgICAgICAgICAgICBmb3IgKGludCB5ID0gMDsgeSA8IGhlaWdodDsgeSsrKVxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlc1t4LCB5XSA9IC0xO1xyXG5cclxuICAgICAgICAgICAgUmFuZG9tIHIgPSBuZXcgUmFuZG9tKCk7XHJcbiAgICAgICAgICAgIGZvciAoaW50IHggPSAwOyB4IDwgd2lkdGg7IHgrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZm9yIChpbnQgeSA9IDA7IHkgPCBoZWlnaHQ7IHkrKylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcCA9IHBvc3NpYmlsaXRpZXMoeCwgeSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHAuTGVuZ3RoID09IDApXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvdXRwdXRJbXBvc3NpYmxlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZXNbeCwgeV0gPSBwW3IuTmV4dCgwLCBwLkxlbmd0aCldO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG91dHB1dCgpO1xyXG4gICAgICAgICAgICBvdXRwdXRDb3VudHMoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXRpYyBpbnQgd2lkdGg7XHJcbiAgICAgICAgc3RhdGljIGludCBoZWlnaHQ7XHJcbiAgICAgICAgc3RhdGljIGludCB0eXBlQ291bnQ7XHJcbiAgICAgICAgc3RhdGljIGludFssXSB2YWx1ZXM7XHJcbiAgICAgICAgc3RhdGljIGludFtdIGhleFBvc3NpYmlsaXRpZXMoaW50IHgsIGludCB5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgTGlzdDxpbnQ+IHRvUmVtb3ZlID0gbmV3IExpc3Q8aW50PigpO1xyXG4gICAgICAgICAgICBib29sIG9mZnNldCA9IHkgJSAyID09IDA7XHJcbiAgICAgICAgICAgIGlmICh4ID4gMClcclxuICAgICAgICAgICAgICAgIGlmICh2YWx1ZXNbeCAtIDEsIHldICE9IC0xKVxyXG4gICAgICAgICAgICAgICAgICAgIHRvUmVtb3ZlLkFkZCh2YWx1ZXNbeCAtIDEsIHldKTtcclxuICAgICAgICAgICAgaWYgKHggPCB3aWR0aCAtIDEpXHJcbiAgICAgICAgICAgICAgICBpZiAodmFsdWVzW3ggKyAxLCB5XSAhPSAtMSlcclxuICAgICAgICAgICAgICAgICAgICB0b1JlbW92ZS5BZGQodmFsdWVzW3ggKyAxLCB5XSk7XHJcbiAgICAgICAgICAgIGlmICh5ID4gMClcclxuICAgICAgICAgICAgICAgIGlmICh2YWx1ZXNbeCwgeSAtIDFdICE9IC0xKVxyXG4gICAgICAgICAgICAgICAgICAgIHRvUmVtb3ZlLkFkZCh2YWx1ZXNbeCwgeSAtIDFdKTtcclxuICAgICAgICAgICAgaWYgKHkgPCBoZWlnaHQgLSAxKVxyXG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlc1t4LCB5ICsgMV0gIT0gLTEpXHJcbiAgICAgICAgICAgICAgICAgICAgdG9SZW1vdmUuQWRkKHZhbHVlc1t4LCB5ICsgMV0pO1xyXG4gICAgICAgICAgICBpZiAob2Zmc2V0KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoeSA+IDAgJiYgeCA8IHdpZHRoIC0gMSlcclxuICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWVzW3ggKyAxLCB5IC0gMV0gIT0gLTEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvUmVtb3ZlLkFkZCh2YWx1ZXNbeCArIDEsIHkgLSAxXSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoeSA8IGhlaWdodCAtIDEgJiYgeCA8IHdpZHRoIC0gMSlcclxuICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWVzW3ggKyAxLCB5ICsgMV0gIT0gLTEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvUmVtb3ZlLkFkZCh2YWx1ZXNbeCArIDEsIHkgKyAxXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoeSA+IDAgJiYgeCA+MClcclxuICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWVzW3ggLSAxLCB5IC0gMV0gIT0gLTEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvUmVtb3ZlLkFkZCh2YWx1ZXNbeCAtIDEsIHkgLSAxXSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoeSA8IGhlaWdodCAtIDEgJiYgeCA+IDApXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlc1t4IC0gMSwgeSArIDFdICE9IC0xKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b1JlbW92ZS5BZGQodmFsdWVzW3ggLSAxLCB5ICsgMV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIExpc3Q8aW50PiBvdXRwdXQgPSBuZXcgTGlzdDxpbnQ+KCk7XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgdHlwZUNvdW50OyBpKyspXHJcbiAgICAgICAgICAgICAgICBpZiAoIXRvUmVtb3ZlLkNvbnRhaW5zKGkpKVxyXG4gICAgICAgICAgICAgICAgICAgIG91dHB1dC5BZGQoaSk7XHJcbiAgICAgICAgICAgIHJldHVybiBvdXRwdXQuVG9BcnJheSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzdGF0aWMgaW50W10gcG9zc2liaWxpdGllcyhpbnQgeCwgaW50IHkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBMaXN0PGludD4gdG9SZW1vdmUgPSBuZXcgTGlzdDxpbnQ+KCk7XHJcbiAgICAgICAgICAgIGlmICh4ID4gMClcclxuICAgICAgICAgICAgICAgIGlmICh2YWx1ZXNbeCAtIDEsIHldICE9IC0xKVxyXG4gICAgICAgICAgICAgICAgICAgIHRvUmVtb3ZlLkFkZCh2YWx1ZXNbeCAtIDEsIHldKTtcclxuICAgICAgICAgICAgaWYgKHggPCB3aWR0aCAtIDEpXHJcbiAgICAgICAgICAgICAgICBpZiAodmFsdWVzW3ggKyAxLCB5XSAhPSAtMSlcclxuICAgICAgICAgICAgICAgICAgICB0b1JlbW92ZS5BZGQodmFsdWVzW3ggKyAxLCB5XSk7XHJcbiAgICAgICAgICAgIGlmICh5ID4gMClcclxuICAgICAgICAgICAgICAgIGlmICh2YWx1ZXNbeCwgeSAtIDFdICE9IC0xKVxyXG4gICAgICAgICAgICAgICAgICAgIHRvUmVtb3ZlLkFkZCh2YWx1ZXNbeCwgeSAtIDFdKTtcclxuICAgICAgICAgICAgaWYgKHkgPCBoZWlnaHQgLSAxKVxyXG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlc1t4LCB5ICsgMV0gIT0gLTEpXHJcbiAgICAgICAgICAgICAgICAgICAgdG9SZW1vdmUuQWRkKHZhbHVlc1t4LCB5ICsgMV0pO1xyXG4gICAgICAgICAgICBMaXN0PGludD4gb3V0cHV0ID0gbmV3IExpc3Q8aW50PigpO1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IHR5cGVDb3VudDsgaSsrKVxyXG4gICAgICAgICAgICAgICAgaWYgKCF0b1JlbW92ZS5Db250YWlucyhpKSlcclxuICAgICAgICAgICAgICAgICAgICBvdXRwdXQuQWRkKGkpO1xyXG4gICAgICAgICAgICByZXR1cm4gb3V0cHV0LlRvQXJyYXkoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXQp9Cg==
