import { Combobox } from "@headlessui/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { TbSelector } from "react-icons/tb";
import _ from "lodash";
const ComboboxUser = ({
  dataset,
  onChange,
  disable = false,
  onSearchChange = () => {},
}: {
  dataset: any | unknown;
  multiple?: boolean;
  onChange: Dispatch<SetStateAction<any>>;
  disable?: boolean;
  onSearchChange?: (data: string) => void;
}) => {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);
  const filtered =
    query === ""
      ? dataset
      : dataset.filter((data: any) =>
          data.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <>
      <div className="relative w-full">
        <Combobox
          disabled={disable}
          value={selected}
          onChange={(e: any) => {
            onChange(e.value), setSelected(e);
          }}
        >
          <div className="relative flex w-full items-center justify-between rounded-md bg-[#EFEFEF] ">
            <Combobox.Input
              className={
                " relative  w-full rounded-md border border-gray px-2 py-1 outline-none   "
              }
              autoComplete={"false"}
              displayValue={(value: any | unknown) => {
                return value?.name;
              }}
              onChange={(event) => {
                setQuery(event.target.value);
                onSearchChange(event.target.value);
              }}
            />
            <Combobox.Button className="absolute right-2">
              <TbSelector />
            </Combobox.Button>
          </div>
          <div className="absolute top-14 z-10  w-full rounded-md bg-[#EFEFEF] shadow-xl overflow-x-auto max-h-[250px]">
            {dataset ? (
              <Combobox.Options>
                {filtered?.length !== 0 ? (
                  filtered?.map((x: any | unknown, i: number) => {
                    return (
                      <Combobox.Option
                        key={i}
                        value={x}
                        className={
                          "cursor-pointer rounded-md px-3 py-3 hover:bg-yellow-500"
                        }
                      >
                        <label htmlFor="">{x.name}</label>
                      </Combobox.Option>
                    );
                  })
                ) : (
                  <Combobox.Option
                    key={0}
                    className={
                      "cursor-pointer rounded-md px-3 py-3 hover:bg-yellow-500"
                    }
                    value={null}
                  >
                    <label htmlFor="">No Data!!</label>
                  </Combobox.Option>
                )}
              </Combobox.Options>
            ) : null}
          </div>
        </Combobox>
        {/* {value && JSON.stringify(value)} */}
      </div>
    </>
  );
};

export default ComboboxUser;
