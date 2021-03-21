// React
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";

// Third party
import axios from "axios";
import { MapContainer, TileLayer, MapConsumer, Marker } from "react-leaflet";
import { LeafletMouseEvent } from "leaflet";
import { useHistory } from "react-router-dom";

// Component
import Header from "../../components/Header";
import SuccessModal from "../../components/ModalSuccess";

// Local
import "../../static/scss/create-point.scss";

// Api
import api from "../../services/api";

interface ItemsProps {
  id: number;
  title: string;
  image: string;
}

interface IBGEUfProps {
  sigla: string;
}

interface IBGECityProps {
  nome: string;
}

const CreatePoint: React.FC = () => {
  const history = useHistory();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
  });

  const [items, setItems] = useState<ItemsProps[]>([]);
  const [ufs, setUfs] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  const [selectedUf, setSelectedUf] = useState("0");
  const [selectedCity, setSelectedCity] = useState("0");
  const [selectedItem, setSelectedItem] = useState<number[]>([]);
  const [selectedPosition, setSelectedPosition] = useState<[number, number]>([
    0,
    0,
  ]);

  const [initialsPosition, setInitialsPosition] = useState<[number, number]>([
    0,
    0,
  ]);

  const [timeModal, setTimeModal] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;

      setInitialsPosition([latitude, longitude]);
    });
  }, []);

  useEffect(() => {
    api.get("items").then((response) => {
      setItems(response.data);
    });
  }, []);

  useEffect(() => {
    axios
      .get<IBGEUfProps[]>(
        "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
      )
      .then((response) => {
        const ufInitials = response.data.map((uf) => uf.sigla);

        setUfs(ufInitials);
      });
  }, []);

  useEffect(() => {
    if (selectedUf === "0") return;

    axios
      .get<IBGECityProps[]>(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`
      )
      .then((response) => {
        const cityNames = response.data.map((city) => city.nome);

        setCities(cityNames);
      });
  }, [selectedUf]);

  function handleSelectedUf(event: ChangeEvent<HTMLSelectElement>) {
    const uf = event.target.value;

    setSelectedUf(uf);
  }

  function handleSelectedCity(event: ChangeEvent<HTMLSelectElement>) {
    const city = event.target.value;

    setSelectedCity(city);
  }

  function handleInputchange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });
  }

  function handleSelectItem(id: number) {
    const alreadySelected = selectedItem.findIndex((item) => item === id);

    if (alreadySelected >= 0) {
      const filteredItem = selectedItem.filter((item) => item !== id);

      setSelectedItem(filteredItem);
    } else {
      setSelectedItem([...selectedItem, id]);
    }
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const { name, email, whatsapp } = formData;
    const uf = selectedUf;
    const city = selectedCity;
    const [latitude, longitude] = selectedPosition;
    const items = selectedItem;

    const data = {
      name,
      email,
      whatsapp,
      uf,
      city,
      latitude,
      longitude,
      items,
    };

    if (
      data.name &&
      data.email &&
      data.whatsapp !== "" &&
      data.uf &&
      data.city &&
      data.latitude &&
      data.longitude !== 0 &&
      data.items.length !== 0
    ) {
      await api
        .post("/points", data)
        .then(() => {
          setTimeModal(true);

          setTimeout(() => {
            setTimeModal(false);
            history.push("/");
          }, 1500);
        })
        .catch(() => {
          alert("deu erro ai");
        });
    } else {
      alert("Coe, preencha tudo. Na moral");
    }
  }

  return (
    <>
      {timeModal && <SuccessModal />}
      <div className="container-create-point">
        <Header CallBack />

        <form onSubmit={handleSubmit}>
          <h1>
            Cadastro do <br /> ponto de coleta
          </h1>

          <fieldset>
            <legend>
              <h2>Dados</h2>
            </legend>

            <div className="field">
              <label htmlFor="name">Nome da entidade</label>
              <input
                type="text"
                name="name"
                id="name"
                onChange={handleInputchange}
              />
            </div>

            <div className="field-group">
              <div className="field">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  onChange={handleInputchange}
                />
              </div>
              <div className="field">
                <label htmlFor="zap">Whatsapp</label>
                <input
                  type="Number"
                  name="whatsapp"
                  id="zap"
                  onChange={handleInputchange}
                />
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>
              <h2>Endereço</h2>
              <span>Selecione o endereço no mapa</span>
            </legend>

            <MapContainer center={initialsPosition} zoom={5}>
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={selectedPosition} />

              <MapConsumer>
                {(map) => {
                  map.on("click", function (event: LeafletMouseEvent) {
                    setSelectedPosition([event.latlng.lat, event.latlng.lng]);
                  });
                  return null;
                }}
              </MapConsumer>
            </MapContainer>

            <div className="field-group">
              <div className="field">
                <label htmlFor="uf">Estado (UF)</label>
                <select
                  name="uf"
                  id="uf"
                  value={selectedUf}
                  onChange={handleSelectedUf}
                >
                  <option value="0">Selecione uma UF</option>
                  {ufs.map((uf) => (
                    <option key={uf} value={uf}>
                      {uf}
                    </option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label htmlFor="city">Cidade</label>
                <select
                  name="city"
                  id="city"
                  value={selectedCity}
                  onChange={handleSelectedCity}
                >
                  <option value="0">Selecione uma cidade</option>
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>
              <h2>Ítens de coleta</h2>
              <span>Selecione um ou mais ítens abaixo</span>
            </legend>

            <ul className="items-grid">
              {items.map((item) => (
                <li
                  key={item.id}
                  onClick={() => handleSelectItem(item.id)}
                  className={selectedItem.includes(item.id) ? "selected" : ""}
                >
                  <img src={item.image} alt={item.title} />
                  <span>{item.title}</span>
                </li>
              ))}
            </ul>
          </fieldset>

          <button type="submit">Cadastrar ponto de coleta</button>
        </form>
      </div>
    </>
  );
};

export default CreatePoint;
