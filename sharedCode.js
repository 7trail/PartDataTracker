function getWeights() {
            let weightDict = {};
            for (let attr of attributes) {
                if (document.getElementById(attr+"WeightSlider")) {
                    weightDict[attr] = document.getElementById(attr+"WeightSlider").value;
                } else {
                    weightDict[attr] = 1;
                }
            }
            return weightDict;
        }

        function getPercentile(array,element, reverse) {
            let count = 0;
            array.forEach(v => {
                if (v < element) {
                count++;
                } else if (v == element) {
                count += 0.5;
                }
            });
            if (reverse !== undefined && reverse) {
                return 1-(count / array.length);
            }
            return count / array.length;
        }

        function getPartByName(partName) {
            for (let p of partData) {
                if (p["name"] == partName) {
                    return p;
                }
            }
            return null;
        }

        function getValueArray(key) {
            let d = [];
            for (let el of partData) {
                d.push(el[key]);
            }
            return d;
        }

        function formatElementByRank(element,rank, saturation, lightness) {
            let finalColor = 0;
            if (saturation == undefined) {
                saturation = 100;
            }
            if (lightness == undefined) {
                lightness = 50;
            }
            finalColor = Math.pow(rank,3) * 200;
            element.style = `background-color: hsl(${finalColor}, ${saturation}%, ${lightness}%);`;
            if (finalColor < 20 || lightness < 25) {
                element.style.color = "white";
            }
        }

        function easyGetPercentile(element, key, reverse, arr) {
            if (typeof(arr) == "undefined") {
                arr = getValueArray(key).sort(compareFn = numberCompFn);
            }
            return getPercentile(arr, element[key], reverse);
        }
