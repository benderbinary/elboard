<template>
    <main class="main bg-white p-4">
        <section class="main_overview flex flex-wrap border-b border-lightgreen">
            <div v-for="card in cards" :key="card.info"
                class="overview_card flex justify-between items-center p-5 m-2 border border-darkblue rounded text-darkblue">
                <div>{{ card.info }}</div>
                <div>{{ card.icon }}</div>
            </div>
        </section>
        <section class="main_cards grid grid-cols-1 gap-4 p-4">
            <div v-for="card in detailedCards" :key="card" class="card p-5 border border-tomato rounded text-tomato">
                {{ card }}
            </div>
        </section>
    </main>
</template>

<script>
export default {
    name: "MainContentView",
    data() {
        return {
            cards: [
                { info: "Overview", icon: "Card" },
                { info: "Overview", icon: "Card" },
                { info: "Overview", icon: "Card" },
                { info: "Overview", icon: "Card" },
            ],
            detailedCards: ["Card", "Card", "Card"],
        };
    },
};
</script>
