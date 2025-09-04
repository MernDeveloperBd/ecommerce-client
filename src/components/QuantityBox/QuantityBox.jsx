import { Button } from "@mui/material";
import PropTypes from "prop-types";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

const clamp = (n, min, max) => Math.min(max, Math.max(min, n));

const QuantityBox = ({
  value = 1,
  onChange,
  min = 1,
  max = 99,
  disabled = false,
  className = "",
}) => {
  const val = clamp(Number(value) || 1, min, max);

  const plusQty = () => {
    if (disabled) return;
    const next = clamp(val + 1, min, max);
    onChange?.(next);
  };

  const minusQty = () => {
    if (disabled) return;
    const next = clamp(val - 1, min, max);
    onChange?.(next);
  };

  return (
    <div className={`qtyBox flex items-center relative ${className}`}>
      <input
        type="number"
        className="w-full h-[35px] p-2 pr-8 text-[15px] focus:outline-none border border-[rgba(0,0,0,0.3)] rounded-md"
        value={val}
        readOnly
        min={min}
        max={max}
        disabled={disabled}
        aria-label="Quantity"
      />
      <div className="flex items-center flex-col justify-between h-[38px] absolute top-0 right-0 z-50">
        <Button
          onClick={plusQty}
          disabled={disabled || val >= max}
          className="!min-w-[30px] !w-[20px] !h-[15px] !text-[13px] !text-black !mt-0.5"
        >
          <FaAngleUp />
        </Button>
        <Button
          onClick={minusQty}
          disabled={disabled || val <= min}
          className="!min-w-[30px] !w-[20px] !h-[15px] !text-[13px] !text-black !mb-0.5"
        >
          <FaAngleDown />
        </Button>
      </div>
    </div>
  );
};

QuantityBox.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onChange: PropTypes.func,
  min: PropTypes.number,
  max: PropTypes.number,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default QuantityBox;