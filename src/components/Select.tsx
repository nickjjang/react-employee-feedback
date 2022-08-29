import { SyntheticEvent } from "react";
import styled from "styled-components";
import { ISelect } from "../services/types";

const SelectStyled = styled.select`
  font-size: 16px;
  line-height: 24px;
  padding: 4px 8px;
  border-radius: 5px;
`;

const Select = function ({
  list = [],
  value,
  name,
  onChange,
}: {
  list?: ISelect[];
  value?: any;
  name?: string;
  onChange?: (e: SyntheticEvent) => void;
}) {
  return (
    <SelectStyled name={name} onChange={onChange} value={value}>
      {list &&
        list.length > 0 &&
        list.map((item: any, index: number) => (
          <option value={item.key} key={item.key}>
            {item.value}
          </option>
        ))}
    </SelectStyled>
  );
};

export default Select;
