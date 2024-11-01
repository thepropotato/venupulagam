const others = [
    "// THIS CODE SHOWS MY ADDITIONAL ENGAGEMENTS",
    "",
    "function fetchAdditionals() {",
    "",
    "    const userName = \"Venu Pulagam\";",
    "    const apiUrl = \"https://venupulagam.com/additional-engagements\";",
    "    const prompt = `What are the non technical engagements of ${userName}?`;",
    "",
    "    const payload = {",
    "        prompt: prompt",
    "    };",
    "",
    "    const API_KEY = \"NOPE, WE DON'T EXPOSE API KEYS LIKE THIS\";",
    "    ",
    "    const headers = {",
    "        \"Authorization\": `Bearer ${API_KEY}`,",
    "        \"Content-Type\": \"application/json\"",
    "    };",
    "",
    "    fetch(apiUrl, {",
    "        method: \"POST\",",
    "        headers: headers,",
    "        body: JSON.stringify(payload)",
    "    })",
    "    .then(response => {",
    "        return new Promise(resolve => setTimeout(() => resolve({",
    "            json: () => Promise.resolve({",
    "                status: \"success\",",
    "                add_eng: []",
    "            })",
    "        }), 2000));",
    "    })",
    "    .then(response => response.json())",
    "    .then(data => {",
    "        if (data.status === \"success\") {",
    "            console.log(\"Additional Engagements :\", data.others);",
    "        } else {",
    "            console.log(\"Failed to fetch data.\");",
    "        }",
    "    })",
    "    .catch(error => {",
    "        console.error(\"Error occurred while fetching data:\", error);",
    "    });",
    "}",
    "",
    "fetchAdditionals();"
];


export default others