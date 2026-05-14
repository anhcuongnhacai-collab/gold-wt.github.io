import { db, ref, get } from "./firebase-config.js";

export async function getUserBalance(currentUser) {
    if (!currentUser) {
        return {
            balance: 0,
            available: 0,
            totalDeposit: 0,
            totalWithdrawSuccess: 0,
            totalWithdrawPending: 0
        };
    }

    const baseMoney = Number(currentUser.baseMoney || 10000);

    let totalDeposit = 0;
    let totalWithdrawSuccess = 0;
    let totalWithdrawPending = 0;

    // Tính tổng nạp thành công
    const depositSnap = await get(ref(db, "deposits"));
    if (depositSnap.exists()) {
        depositSnap.forEach(s => {
            const v = s.val();
            if (
                v.phone === currentUser.phone &&
                v.status === "Thành công"
            ) {
                totalDeposit += Number(v.amount || 0);
            }
        });
    }

    // Tính tổng rút
    const withdrawSnap = await get(ref(db, "withdraws"));
    if (withdrawSnap.exists()) {
        withdrawSnap.forEach(s => {
            const v = s.val();
            if (v.phone === currentUser.phone) {
                if (v.status === "Thành công") {
                    totalWithdrawSuccess += Number(v.amount || 0);
                } else if (v.status === "pending") {
                    totalWithdrawPending += Number(v.amount || 0);
                }
            }
        });
    }

    // Tổng số dư thực tế
    const balance =
        baseMoney +
        totalDeposit -
        totalWithdrawSuccess;

    // Số tiền có thể rút
    const available =
        balance -
        totalWithdrawPending;

    return {
        balance,
        available,
        totalDeposit,
        totalWithdrawSuccess,
        totalWithdrawPending
    };
}