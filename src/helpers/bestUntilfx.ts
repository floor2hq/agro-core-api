
function bestUntilFx(producedAt:Date, lifespan: number) {
    console.log(producedAt,lifespan);
    const cropGoodUntil = new Date(producedAt.getTime() + lifespan * 24 * 60 * 60 * 1000);
    const currentTime = new Date();
    const Ttl : number  = cropGoodUntil.getTime() - currentTime.getTime();
    const ans = parseFloat((Ttl/(24 * 60 * 60 * 1000)).toFixed(2));
    console.log(ans, "daz left")
    return ans
}

export default bestUntilFx