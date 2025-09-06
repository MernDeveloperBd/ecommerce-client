import { Button, TextField, MenuItem, Select, FormControl, InputLabel, RadioGroup, Radio, FormControlLabel } from '@mui/material';
import { Divisions } from '../DataDivision/Divisions';
import { BsFillBagCheckFill } from 'react-icons/bs';
import { useContext, useMemo, useState } from 'react';
import { MyContext } from '../../App';
import { postData } from '../../utils/api';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { cartData, openAlertBox, userData, getCartItems } = useContext(MyContext);

  const [division, setDivision] = useState('');
  const [district, setDistrict] = useState('');
  const [upazila, setUpazila] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    apartment: '',
    postcode: '',
    phone: '',
    note: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('COD'); // 'COD' | 'BKASH'
  const [bkashNumber, setBkashNumber] = useState('');
  const [bkashTrxId, setBkashTrxId] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();

  // Public config for showing the receiver number (frontend)
  const BKASH_RECEIVER =
    (typeof import.meta !== 'undefined' && import.meta.env?.VITE_BKASH_RECEIVER) ||
    (typeof process !== 'undefined' && process.env?.REACT_APP_BKASH_RECEIVER) ||
    '01572035173';

  const selectedDivision = useMemo(
    () => Divisions.find((d) => d.key === division),
    [division]
  );
  const selectedDistrict = useMemo(
    () => selectedDivision?.districts.find((dist) => dist.key === district),
    [selectedDivision, district]
  );

  // Totals
  const { subtotal, discount, shipping, grandTotal, insideDhaka } = useMemo(() => {
    const sub = Array.isArray(cartData)
      ? cartData.reduce((sum, item) => sum + Number(item?.price || 0) * Number(item?.quantity || 0), 0)
      : 0;

    const disc = sub > 3000 ? Math.round(sub * 0.10) : 0;
    const isInsideDhaka = (selectedDistrict?.label || '').toLowerCase().includes('dhaka');
    const ship = sub > 5000 ? 0 : (isInsideDhaka ? 80 : 140);
    const total = Math.max(0, sub - disc + ship);

    return {
      subtotal: sub,
      discount: disc,
      shipping: ship,
      grandTotal: total,
      insideDhaka: isInsideDhaka
    };
  }, [cartData, selectedDistrict]);

  const handleDivisionChange = (e) => {
    setDivision(e.target.value);
    setDistrict('');
    setUpazila('');
  };
  const handleDistrictChange = (e) => {
    setDistrict(e.target.value);
    setUpazila('');
  };
  const handleUpazilaChange = (e) => setUpazila(e.target.value);

  const handleChange = (e) =>
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  const validate = () => {
    if (!userData?._id) {
      openAlertBox('error', 'You are not logged in. please login first');
      return false;
    }
    if (!cartData || cartData.length === 0) {
      openAlertBox('error', 'Your cart is empty.');
      return false;
    }
    const requiredFields = ['name', 'email', 'address', 'postcode', 'phone'];
    for (const f of requiredFields) {
      if (!formData[f]) {
        openAlertBox('error', `Please provide ${f}`);
        return false;
      }
    }
    if (!division || !district || !upazila) {
      openAlertBox('error', 'Please select Division, District and Upazila');
      return false;
    }
    if (paymentMethod === 'BKASH') {
      if (!bkashNumber || !bkashTrxId) {
        openAlertBox('error', 'Please provide bKash number and transaction ID');
        return false;
      }
    }
    return true;
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      openAlertBox('success', 'Copied!');
    } catch {
      openAlertBox('error', 'Copy failed');
    }
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!validate()) return;

    try {
      setSubmitting(true);

      const payload = {
        shippingAddress: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          apartment: formData.apartment,
          postcode: formData.postcode,
          divisionKey: division,
          divisionLabel: selectedDivision?.label || '',
          districtKey: district,
          districtLabel: selectedDistrict?.label || '',
          upazila
        },
        payment: {
          method: paymentMethod,
          bkash: paymentMethod === 'BKASH' ? { number: bkashNumber, trxId: bkashTrxId } : null
        },
        customerNote: formData.note?.trim() || '',
        previewTotals: { subtotal, discount, shipping, grandTotal }
      };

      const res = await postData('/api/order', payload);
      if (res?.error === false) {
        openAlertBox('success', 'Order placed successfully 🎉');
        await getCartItems(); // cart becomes empty
        navigate('/my-orders', { replace: true });
      } else {
        openAlertBox('error', res?.message || 'Order failed');
      }
    } catch (err) {
      openAlertBox('error', 'Something went wrong while placing order');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-10">
      <div className="container flex flex-col md:flex-row gap-5">
        {/* left */}
        <div className="left md:w-[70%]">
          <div className="card bg-white shadow-md p-5 rounded-md w-full">
            <h1 className="text-[18px] font-bold">Billing Details</h1>
            <form className="w-full mt-5 space-y-3" onSubmit={handleSubmit}>
              {/* Name + Email */}
              <div className="flex items-center gap-5 pb-3">
                <div className="col w-[50%]">
                  <TextField className="w-full" label="Full Name" name="name" value={formData.name} onChange={handleChange} variant="outlined" size="small" required />
                </div>
                <div className="col w-[50%]">
                  <TextField className="w-full" label="Email" name="email" value={formData.email} onChange={handleChange} variant="outlined" size="small" required />
                </div>
              </div>

              {/* Address */}
              <h4 className="text-[14px] font-[500] mb-3">Street Address *</h4>
              <div className="flex items-center gap-5 pb-3">
                <div className="col w-full">
                  <TextField className="w-full" label="Your full address" name="address" value={formData.address} onChange={handleChange} variant="outlined" size="small" required />
                </div>
              </div>
              <div className="flex items-center gap-5 pb-3">
                <div className="col w-full">
                  <TextField className="w-full" label="Apartment, suite, unit etc (optional)" name="apartment" value={formData.apartment} onChange={handleChange} variant="outlined" size="small" />
                </div>
              </div>

              {/* Division / District / Upazila */}
              <div className="flex items-center gap-5 pb-3">
                <div className="col w-[33%]">
                  <FormControl fullWidth size="small">
                    <InputLabel>Division *</InputLabel>
                    <Select value={division} onChange={handleDivisionChange} required>
                      {Divisions.map((d) => (
                        <MenuItem key={d.key} value={d.key}>{d.label}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                <div className="col w-[33%]">
                  <FormControl fullWidth size="small" disabled={!division}>
                    <InputLabel>District *</InputLabel>
                    <Select value={district} onChange={handleDistrictChange} required>
                      {selectedDivision?.districts.map((dist) => (
                        <MenuItem key={dist.key} value={dist.key}>{dist.label}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                <div className="col w-[33%]">
                  <FormControl fullWidth size="small" disabled={!district}>
                    <InputLabel>Upazila *</InputLabel>
                    <Select value={upazila} onChange={handleUpazilaChange} required>
                      {selectedDistrict?.upazilas.map((u) => (
                        <MenuItem key={u} value={u}>{u}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              </div>

              {/* Postcode + Phone */}
              <div className="flex gap-2 w-full">
                <div className='md:w-[50%]'>
                  <h4 className="text-[14px] font-[500] mb-3">Postcode / Zip *</h4>
                  <div className="flex items-center gap-5 pb-3">
                    <div className="col w-full">
                      <TextField className="w-full" label="Postcode / Zip" name="postcode" value={formData.postcode} onChange={handleChange} variant="outlined" size="small" required />
                    </div>
                  </div>
                </div>
                <div className='md:w-[50%]'>
                  <h4 className="text-[14px] font-[500] mb-3">Phone Number *</h4>
                  <div className="flex items-center gap-5 pb-3">
                    <div className="col w-full">
                      <TextField className="w-full" label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} variant="outlined" size="small" required />
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment */}
              <div className="pt-4">
                <h4 className="text-[14px] font-[600] mb-2">Payment Method</h4>
                <RadioGroup row value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                  <FormControlLabel value="COD" control={<Radio />} label="Cash on Delivery" />
                  <FormControlLabel value="BKASH" control={<Radio />} label="bKash (Manual)" />
                </RadioGroup>

                {paymentMethod === 'BKASH' && (
                  <>
                    <div className="bg-pink-50 border border-pink-200 rounded p-3 mt-3 text-sm">
                      <div className="flex items-center justify-between">
                        <div>
                          bKash receiver number: <b>{BKASH_RECEIVER}</b>
                        </div>
                        <Button size="small" onClick={() => copyToClipboard(BKASH_RECEIVER)} className="!normal-case">Copy</Button>
                      </div>
                      <ul className="list-disc ml-6 mt-2">
                        <li>Send money to the above number.</li>
                        <li>Then enter your sender number and the transaction ID below.</li>
                      </ul>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                      <TextField
                        label="bKash Sender Number"
                        value={bkashNumber}
                        onChange={(e) => setBkashNumber(e.target.value)}
                        size="small"
                        required
                      />
                      <TextField
                        label="bKash Transaction ID"
                        value={bkashTrxId}
                        onChange={(e) => setBkashTrxId(e.target.value)}
                        size="small"
                        required
                      />
                    </div>
                  </>
                )}
              </div>

              {/* Order Note */}
              <div className="pt-4">
                <h4 className="text-[14px] font-[600] mb-2">Order Note (Optional)</h4>
                <TextField
                  name="note"
                  value={formData.note}
                  onChange={handleChange}
                  multiline
                  rows={3}
                  placeholder="ডেলিভারি নোট/স্পেশাল ইন্সট্রাকশন লিখুন (max 500 chars)"
                  fullWidth
                  size="small"
                  variant="outlined"
                  inputProps={{ maxLength: 500 }}
                  helperText={`${formData.note.length}/500`}
                />
              </div>

              {/* Place Order */}
              <div className="pt-4">
                <Button
                  onClick={handleSubmit}
                  disabled={submitting || !cartData?.length}
                  className="bg-btn hover:bg-btn w-full flex items-center gap-2 !text-white"
                >
                  <BsFillBagCheckFill className="text-[20px]" />
                  {submitting ? 'Placing order...' : 'Place Order'}
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* right */}
        <div className="rightCol md:w-[30%]">
          <div className="card shadow-md bg-white p-5 rounded-md">
            <h2 className="text-[18px] font-bold mb-4">Your Order</h2>
            <div className="flex items-center justify-between py-3 border-y border-[rgba(0,0,0,0.1)]">
              <span className="text-[14px] font-[600]">Product</span>
              <span className="text-[14px] font-[600]">Subtotal</span>
            </div>

            <div className="scrollSm max-h-[250px] overflow-y-scroll overflow-x-hidden pr-2 mb-5">
              {cartData?.map((item, index) => (
                <div key={index} className="flex items-center justify-between py-2">
                  <div className="part1 flex items-center gap-3">
                    <div className="img w-[50px] h-[50px] overflow-hidden rounded-md group cursor-pointer bg-gray-50">
                      <img
                        src={item?.image || 'https://via.placeholder.com/50'}
                        alt={item?.productTitle}
                        className="w-full h-full object-cover transition-all group-hover:scale-105"
                      />
                    </div>
                    <div className="info">
                      <h4 className="text-[14px]">{item?.productTitle}</h4>
                      <p className="text-[12px] text-gray-500">Qty: {item?.quantity}</p>
                    </div>
                  </div>
                  <span className="text-[14px] font-[500] text-primary">
                    TK {(Number(item?.price) * Number(item?.quantity)).toFixed(0)}
                  </span>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="space-y-2 text-[14px]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>TK {subtotal.toFixed(0)}</span>
              </div>
              <div className="flex justify-between">
                <span>Discount {subtotal > 3000 ? '(10%)' : ''}</span>
                <span className={discount ? 'text-green-600' : ''}>- TK {discount.toFixed(0)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping {subtotal > 5000 ? '(Free)' : insideDhaka ? '(Dhaka)' : '(Outside Dhaka)'}</span>
                <span>TK {shipping.toFixed(0)}</span>
              </div>
              <div className="flex justify-between font-bold border-t pt-2">
                <span>Total</span>
                <span>TK {grandTotal.toFixed(0)}</span>
              </div>
            </div>

            {/* Secondary place order button */}
            <div className="mt-4">
              <Button
                onClick={handleSubmit}
                disabled={submitting || !cartData?.length}
                className="bg-btn hover:bg-btn w-full flex items-center gap-2 !text-white"
              >
                <BsFillBagCheckFill className="text-[20px]" /> {submitting ? 'Placing order...' : 'Place Order'}
              </Button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;