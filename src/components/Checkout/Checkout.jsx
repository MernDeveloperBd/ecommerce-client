import { Button } from '@mui/material';
import { TextField, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { Divisions } from '../DataDivision/Divisions';
import { BsFillBagCheckFill } from 'react-icons/bs';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Checkout = () => {
  const [division, setDivision] = useState('');
  const [district, setDistrict] = useState('');
  const [upazila, setUpazila] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    apartment: '',
    postcode: '',
    phone: ''
  });

  // Dummy products (তুমি চাইলে cart থেকে আনতে পারবে)
  const [products] = useState([
    { id: 1, title: "Product title", qty: 1, price: 1250 },
    { id: 2, title: "Product title", qty: 1, price: 1250 },
    { id: 3, title: "Product title", qty: 1, price: 1250 },
    { id: 4, title: "Product title", qty: 1, price: 1250 },
  ]);

  const total = products.reduce((sum, p) => sum + p.price * p.qty, 0);

  const handleDivisionChange = (e) => {
    setDivision(e.target.value);
    setDistrict('');
    setUpazila('');
  };

  const handleDistrictChange = (e) => {
    setDistrict(e.target.value);
    setUpazila('');
  };

  const handleUpazilaChange = (e) => {
    setUpazila(e.target.value);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    const data = {
      ...formData,
      division,
      district,
      upazila,
      products,
      total
    };
    console.log("✅ Checkout Data:", data);
    alert("Checkout data has been logged in console ✅");
  };

  const selectedDivision = Divisions.find((d) => d.key === division);
  const selectedDistrict = selectedDivision?.districts.find((dist) => dist.key === district);

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
                  <TextField
                    className="w-full"
                    label="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    variant="outlined"
                    size="small"
                    required
                  />
                </div>
                <div className="col w-[50%]">
                  <TextField
                    className="w-full"
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    variant="outlined"
                    size="small"
                    required
                  />
                </div>
              </div>

              {/* Address */}
              <h4 className="text-[14px] font-[500] mb-3">Street Address *</h4>
              <div className="flex items-center gap-5 pb-3">
                <div className="col w-full">
                  <TextField
                    className="w-full"
                    label="Your full address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    variant="outlined"
                    size="small"
                    required
                  />
                </div>
              </div>
              <div className="flex items-center gap-5 pb-3">
                <div className="col w-full">
                  <TextField
                    className="w-full"
                    label="Apartment, suite, unit etc (optional)"
                    name="apartment"
                    value={formData.apartment}
                    onChange={handleChange}
                    variant="outlined"
                    size="small"
                  />
                </div>
              </div>

              {/* Division / District / Upazila */}
              <div className="flex items-center gap-5 pb-3">
                <div className="col w-[33%]">
                  <FormControl fullWidth size="small">
                    <InputLabel>Division *</InputLabel>
                    <Select value={division} onChange={handleDivisionChange} required>
                      {Divisions.map((d) => (
                        <MenuItem key={d.key} value={d.key}>
                          {d.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>

                <div className="col w-[33%]">
                  <FormControl fullWidth size="small" disabled={!division}>
                    <InputLabel>District *</InputLabel>
                    <Select value={district} onChange={handleDistrictChange} required>
                      {selectedDivision?.districts.map((dist) => (
                        <MenuItem key={dist.key} value={dist.key}>
                          {dist.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>

                <div className="col w-[33%]">
                  <FormControl fullWidth size="small" disabled={!district}>
                    <InputLabel>Upazila *</InputLabel>
                    <Select value={upazila} onChange={handleUpazilaChange} required>
                      {selectedDistrict?.upazilas.map((u) => (
                        <MenuItem key={u} value={u}>
                          {u}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              </div>

              <div className="flex gap-2 w-full">
                {/* Postcode */}
                <div className='md:w-[50%]'>
                  <h4 className="text-[14px] font-[500] mb-3">Postcode / Zip *</h4>
                  <div className="flex items-center gap-5 pb-3">
                    <div className="col w-full">
                      <TextField
                        className="w-full"
                        label="Postcode / Zip"
                        name="postcode"
                        value={formData.postcode}
                        onChange={handleChange}
                        variant="outlined"
                        size="small"
                        required
                      />
                    </div>
                  </div>
                </div>
                {/* Phone */}
                <div className='md:w-[50%]'>
                  <h4 className="text-[14px] font-[500] mb-3">Phone Number *</h4>
                  <div className="flex items-center gap-5 pb-3">
                    <div className="col w-full">
                      <TextField
                        className="w-full"
                        label="Phone Number"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        variant="outlined"
                        size="small"
                        required
                      />
                    </div>
                  </div>
                </div>
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
              {products.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between py-2"
                >
                  <div className="part1 flex items-center gap-3">
                    <div className="img w-[50px] h-[50px] overflow-hidden rounded-md group cursor-pointer">
                      <img
                        src="https://i.ibb.co/dxfD53n/Digital-Print-Lone-Three-Piece-7-kenakatabazar-bd.jpg"
                        alt=""
                        className="w-full transition-all group-hover:scale-105"
                      />
                    </div>
                    <div className="info">
                      <h4 className="text-[14px]">{p.title}</h4>
                      <p className="text-[14px]">
                        Qty: <span>{p.qty}</span>
                      </p>
                    </div>
                  </div>
                  <span className="text-[14px] font-[500] text-primary">
                    TK <span>{p.price}</span>
                  </span>
                </div>
              ))}
              <div className="text-right">
                <h4 className="text">Total: {total} TK</h4>
              </div>
            </div>

            {/* Checkout button - triggers same submit */}
            <Link to='/checkout'>
            <Button
              onClick={handleSubmit}
              className="bg-btn hover:bg-btn w-full flex items-center gap-2"
            >
              <BsFillBagCheckFill className="text-[20px]" /> Checkout
            </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
