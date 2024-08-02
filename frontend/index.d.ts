type Card = {
    id: string,
    title: string;
    desc: string,
    createdAt: string
}

type Column = {
    id: string,
    name: string,
    data: Card[]
}