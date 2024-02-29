import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';

export default function AddComboBuilding() {
  const { handleSubmit, control, watch } = useForm();
  const [type, setType] = useState([]);
  const [materialOptions, setMaterialOptions] = useState([]);
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const selectedType = watch('selectType');

  const onSubmit = async (data) => {
    try{
        const ComboData = {
            comboBuildingName: data.nameCombo,
            type: data.selectType,
            materialIdList: selectedMaterials,
            status: true,
          };
          const response = await axios.post('http://localhost:8080/combobuilding/combo/create',ComboData)

    }
   catch(err){
    console.error(err)
   }
  
  };

  useEffect(() => {
    axios
      .get('http://localhost:8080/combobuilding/material-type/get')
      .then((response) => {
        setType(response.data);
      })
      .catch((error) => {
        console.error('Error fetching combo data:', error);
      });
  }, []);

  useEffect(() => {
    if (selectedType) {
      axios
        .get(
          `http://localhost:8080/combobuilding/material/getByMaterialType?materialTypeId=${selectedType}`
        )
        .then((response) => {
          setMaterialOptions(response.data);
        })
        .catch((error) => {
          console.error('Error fetching combo data:', error);
        });
    }
  }, [selectedType]);

  return (
    <div style={{ padding: '16px' }}>
      <h1>Add Combo Building</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ width: '100%' }}>
          <div>
            <label>Name Combo</label>
            <Controller
              name="nameCombo"
              control={control}
              defaultValue=""
              render={({ field }) => <input {...field} />}
            />
          </div>
          <div>
            <label>Select Type</label>
            <Controller
              name="selectType"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <select {...field}>
                  {type.map((option) => (
                    <option key={option.materialTypeId} value={option.materialTypeId}>
                      {option.typeName}
                    </option>
                  ))}
                </select>
              )}
            />
          </div>
          <div>
            <label>Select Material</label>
            {materialOptions.map((option) => (
              <div key={option.materialId}>
                <input
                  type="checkbox"
                  id={`material-${option.materialId}`}
                  value={option.materialId}
                  onChange={(e) => {
                    const isChecked = e.target.checked;
                    setSelectedMaterials((prevMaterials) =>
                      isChecked
                        ? [...prevMaterials, option.materialId]
                        : prevMaterials.filter((id) => id !== option.materialId)
                    );
                  }}
                />
                <label htmlFor={`material-${option.materialId}`}>{option.materialName}</label>
              </div>
            ))}
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}