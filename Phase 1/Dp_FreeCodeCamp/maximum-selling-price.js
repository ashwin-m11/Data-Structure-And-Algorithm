// https://www.freecodecamp.org/news/demystifying-dynamic-programming-3efafb8d4296/

// bottomsUps
// Pretend you’re selling the friendship bracelets to n customers, and the value of that product increases monotonically. This means that the product has prices {p_1, …, p_n} such that p_i ≤ p_j if customer j comes after customer i. These n customers have values {v_1, …, v_n}. A given customer i will buy a friendship bracelet at price p_i if and only if p_i ≤ v_i; otherwise the revenue obtained from that customer is 0. Assume prices are natural numbers.
// Problem: You must find the set of prices that ensure you the maximum possible revenue from selling your friendship bracelets.

const maxPrice = (price = []) => {
    price = [0, ...price]
    const maxPrice = Math.max(...price);
    const totalCustomer = price.length - 1;
    let table = Array(totalCustomer + 2).fill().map(() => Array(maxPrice + 2));
    for (let i = 0; i <= maxPrice + 1; i++) {
        table[totalCustomer + 1][i] = { maxSum: 0, nextPrice: undefined };
    }
    for (let i = 1; i <= totalCustomer + 1; i++) {
        table[i][maxPrice + 1] = { maxSum: 0, nextPrice: undefined };
    }
    for (let customerPosition = totalCustomer; customerPosition >= 1; customerPosition--) {
        for (let priceVal = 1; priceVal <= maxPrice; priceVal++) {
            let sum = -1;
            let nextPriceValCounter = priceVal
            while (nextPriceValCounter <= maxPrice) {
                nextPriceValCounter++;
                const nextCustomerPriceDetails = table[customerPosition + 1][nextPriceValCounter]
                // if (nextCustomerPriceDetails == undefined) {
                //     table[customerPosition][priceVal] = { sum: priceVal + , nextPrice: nextPriceValCounter }
                //     break
                // };
                if (nextCustomerPriceDetails["maxSum"] > sum) {
                    sum = nextCustomerPriceDetails["maxSum"];
                    const maxSum = price[customerPosition] >= priceVal ? priceVal + sum : 0 + sum;
                    table[customerPosition][priceVal] = { maxSum, nextPrice: nextPriceValCounter }
                }
            }
        }
    }

    let firstPriceForMaxValue = 0;
    let totalMaxSum = 0
    for (let i = 1; i <= maxPrice; i++) {
        const sum = Math.max(table[1][i]["maxSum"])
        if (sum > totalMaxSum) { totalMaxSum = sum; firstPriceForMaxValue = i; }
    }
    let priceArraySol = [];

    priceArraySol.push(firstPriceForMaxValue);
    let currentPrice = firstPriceForMaxValue;
    for (let i = 2; i <= totalCustomer; i++) {
        const nextPriceDetails = table[i - 1][currentPrice];
        currentPrice = nextPriceDetails && nextPriceDetails["nextPrice"] ? nextPriceDetails["nextPrice"] : currentPrice + 1;
        priceArraySol.push(currentPrice);
    }
    // table.forEach(x => console.log(JSON.stringify(x)));
    return priceArraySol
}

//Top Down 
const maxPrice2 = (prices = []) => {
    prices = [0, ...prices];
    let memo = {};
    //  memo = {"i,price" : {maxSum: 15, pricesFromi : [2,6,7]}}
    const fetchMaxValueForGivenPrice = (price, i) => {
        const key = price + "," + i
        if (key in memo) return memo[key];
        if (i === prices.length - 1) {
            const priceVal = price > prices[i] ? 0 : price;
            memo[key] = { "maxSum": priceVal, "pricesFromi": [price] }
            return memo[key];
        }
        if (i >= prices.length) {
            memo[key] = { "maxSum": 0, "pricesFromi": [] }
            return memo[key];
        }

        const currPriceVal = price > prices[i] ? 0 : price;
        const nextCustomer = i + 1;
        let nextPrice = price + 1;
        let maxSum = -1;
        let nextPricesForMaxSum = [];
        // if (price + 1 > prices[nextCustomer])
        while (nextPrice <= prices[nextCustomer]) {
            const nextPriceNextCustomerDetail = fetchMaxValueForGivenPrice(nextPrice, nextCustomer);
            if (nextPriceNextCustomerDetail["maxSum"] + currPriceVal > maxSum) {
                maxSum = nextPriceNextCustomerDetail["maxSum"] + currPriceVal;
                nextPricesForMaxSum = nextPriceNextCustomerDetail["pricesFromi"]
            }
            nextPrice++;
        }
        const nextNextPriceDetails = fetchMaxValueForGivenPrice(price + 2, nextCustomer + 1);
        const maxSumForNextPriceZeroValue = currPriceVal + nextNextPriceDetails["maxSum"]
        if (maxSumForNextPriceZeroValue > maxSum) {
            memo[key] = { "maxSum": maxSumForNextPriceZeroValue, "pricesFromi": [price, price + 1, ...nextNextPriceDetails["pricesFromi"]] };
            return memo[key];
        }
        memo[key] = { "maxSum": maxSum, "pricesFromi": [price, ...nextPricesForMaxSum] };
        return memo[key];
    }

    let totalMaxSum = 0;
    let solArray = []
    for (let i = 1; i <= prices[1]; i++) {
        sumForiPriceDetail = fetchMaxValueForGivenPrice(i, 1);
        if (sumForiPriceDetail["maxSum"] > totalMaxSum) {
            totalMaxSum = sumForiPriceDetail["maxSum"]
            solArray = sumForiPriceDetail["pricesFromi"]}
    }
    // console.log(memo);
    return solArray;
}


// console.log(maxPrice([288, 200, 1900, 700, 199]))
// console.log(maxPrice([2888, 700, 199]))
// console.log(maxPrice([288, 70, 190]))
console.log(new Date())
console.log(maxPrice([14, 2, 5, 3]))
console.log(new Date())
console.log(maxPrice2([2880, 144, 190, 145]))
console.log(new Date())
