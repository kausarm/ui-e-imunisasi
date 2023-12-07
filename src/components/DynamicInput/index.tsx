import React from "react";
import { Button } from "../ui/button";
import { TrashIcon } from "lucide-react";

interface compProps {
  updateArrayValue: any;
  addInputSet: any;
  removeInputSet: any;
  submitData: any;
  manual: any;
  loading: boolean;
}

const DynamicInput: React.FC<compProps> = ({
  updateArrayValue,
  addInputSet,
  removeInputSet,
  submitData,
  loading,
  manual,
}) => {
  return (
    <div className="p-4 mt-8 bg-gray-100 rounded shadow">
      {manual.map((inputSet: any, setIndex: number) => (
        <div key={setIndex} className="p-4 mb-4 border rounded">
          <h2 className="mb-2 text-lg font-semibold">
            ITERASI KE- {setIndex + 1}
          </h2>
          <div className="grid grid-cols-6 gap-4">
            {inputSet.values.map((array: any, arrayIndex: number) => (
              <div key={arrayIndex} className="col-span-2 space-y-2">
                {array.map((value: any, valueIndex: number) => (
                  <div
                    key={valueIndex}
                    className="grid items-center grid-cols-4 space-x-2"
                  >
                    <label className="col-span-2">
                      {
                        ["HBO:", "BCG:", "POLIO1:", "DPT_HB_HIB1:", "CAMPAK:"][
                          valueIndex
                        ]
                      }
                    </label>
                    <input
                      className="w-20 col-span-2 px-2 py-1 border border-gray-300 rounded"
                      type="text"
                      placeholder={`Masukkan Data`}
                      value={value}
                      onChange={(e) =>
                        updateArrayValue(
                          setIndex,
                          arrayIndex,
                          valueIndex,
                          e.target.value
                        )
                      }
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
          <Button
            variant={"destructive"}
            className="mt-4"
            size={"icon"}
            onClick={() => removeInputSet(setIndex)}
          >
            <TrashIcon className="w-4 h-4 text-white" />
          </Button>
        </div>
      ))}
      <Button variant={"default"} className="mt-4 mr-5" onClick={addInputSet}>
        Tambah Input Set
      </Button>
      <Button
        variant={"outline"}
        className="mt-4 text-white bg-yellow-500 hover:bg-yellow-500 hover:text-white"
        onClick={submitData}
      >
        {loading ? "Loading..." : "Proses"}
      </Button>
    </div>
  );
};

export default DynamicInput;
