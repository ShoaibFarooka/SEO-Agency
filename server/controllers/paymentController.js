import { v4 as uuidv4 } from 'uuid'; // for generating unique order IDs
import { Xendit } from 'xendit-node';

const xenditAPIKey = 'xnd_production_oun1Nl1K4P3nKJAazCYR3WzVLsrLCWlZfbhKgs3PoJVBMwacJIknwHOdkZYs4F'; // Replace with your Xendit API Key
const x = new Xendit({
    secretKey: xenditAPIKey,
});
const makepayment = async (req, res) => {
    console.log('Triggered');
    try {
        const { price, email } = req.body;
        console.log(price, email);
        const externalID = uuidv4(); // Generate a unique order ID

        const createInvoice = await x.Invoice.createInvoice({
            externalID,
            payerEmail: email,
            description: 'Test Payment for your order',
            amount: price,
            ///////////
            ///////////
            data: {
                currency: 'IDR', // Replace with your desired currency
                invoice_type: 'ONE_TIME',
                // items: [
                //     {
                //         id: 'item-1',
                //         name: 'Product Name',
                //         price: amount,
                //         quantity: 1,
                //     },
                // ],
            },

        });

        res.json(createInvoice);
    } catch (error) {
        console.log('Error: ', error);
        res.status(500).json({ error: error.message });
    }
}
export default makepayment;