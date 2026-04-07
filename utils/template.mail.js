import dayjs from "dayjs";

export const getReminderTemplate = (label, subscription) => {
    const days = extractDays(label);
    const userName = subscription.user.name;
    const subName = subscription.name;
    const renewalDate = dayjs(subscription.renewalDate).format("DD MMM YYYY");
    const price = `${subscription.price} ${subscription.currency} (${subscription.frequency})`;
    const frequency = subscription.frequency;
    const paymentMethod = subscription.paymentMethod;

    let title = "Subscription Reminder";
    let message = "";
    let subject = "";

    if (days === 7) {
        title = "7 day(s) before remider.";
        subject = `Subscription Reminder: ${subName} renew notification`;
        message = "Your subscription will renew in 7 days. Please review your subscription details.";
    } else if (days === 5) {
        title = "5 day(s) before remider.";
        subject = `Subscription Reminder: ${subName} renew notification`;
        message = "Your subscription renewal is approaching in 5 days.";
    } else if (days === 3) {
        title = "3 day(s) before remider.";
        subject = `Subscription Reminder: ${subName} renew notification`;
        message = "Only 3 days left before your subscription renews.";
    } else if (days === 1) {
        title = "1 day(s) before remider.";
        subject = `Subscription Reminder: ${subName} renew notification`;
        message = "Your subscription will renew tomorrow. Please ensure your payment method is ready.";
    }

    const html = `
        <div style="
            font-family: Arial, sans-serif;
            max-width: 600px;
            margin: auto;
            border: 1px solid #eee;
            border-radius: 10px;
            overflow: hidden;">

        <div style="
            background: #4CAF50;
            color: white;
            padding: 18px;
            text-align: center;
        ">

        <h2>${title}</h2>

        </div>

        <div style="padding: 20px;">

        <p>Hello <b>${userName}</b>,</p>

        <p>${message}</p>

        <div style="
            background: #f9f9f9;
            padding: 15px;
            border-radius: 8px;
            margin-top: 15px;
        ">

        <p><b>Subscription:</b> ${subName}</p>

        <p><b>Price:</b> ${price}</p>

        <p><b>Billing:</b> ${frequency}</p>

        <p><b>Renewal Date:</b> ${renewalDate}</p>

        <p><b>Payment Method:</b> ${paymentMethod}</p>

        </div>

        <p style="
            margin-top: 20px;
            font-size: 14px;
            color: #666;
        ">

        Thank you for using our service 🚀

        </p>
        </div>
        </div>`;
    return {
        title,
        subject,
        html
    };
};

const extractDays = (label) => {
    const match = label.match(/\d+/);
    return match ? Number(match[0]) : null;
};
