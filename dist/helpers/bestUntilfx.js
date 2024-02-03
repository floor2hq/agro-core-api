"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function bestUntilFx(producedAt, lifespan) {
    console.log(producedAt, lifespan);
    const cropGoodUntil = new Date(producedAt.getTime() + lifespan * 24 * 60 * 60 * 1000);
    const currentTime = new Date();
    const Ttl = cropGoodUntil.getTime() - currentTime.getTime();
    const ans = parseFloat((Ttl / (24 * 60 * 60 * 1000)).toFixed(2));
    console.log(ans, "dayz left");
    return ans;
}
exports.default = bestUntilFx;
