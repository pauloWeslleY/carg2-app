import { ICreateDriverDTO } from "@/data/usecases";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CreateDriverTruckSchema } from "../schemas/create-driver-truck.schema";
import type { FormCreateDriverProps } from "../types/form-create-driver.type";
import { useAppDispatch, useAppSelector } from "@/main/store/hook/useRedux";
import { loadCreateDriver, useStateDriver } from "@/main/store/ducks/driver";
import { useRef, useState } from "react";
import { makeNotifyToast } from "@/main/factories/notify-toast";
import driverTrucks from "./seed-driver-truck.json";

export function useFormCreateDriverTruck() {
  const [trips, setTrips] = useState<string[]>([]);
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormCreateDriverProps>({
    mode: "all",
    reValidateMode: "onChange",
    resolver: zodResolver(CreateDriverTruckSchema),
  });
  const inputTripsRef = useRef<HTMLInputElement | null>(null);
  const { isLoading } = useAppSelector(useStateDriver);
  const dispatch = useAppDispatch();

  function handlerAddTrip() {
    const notify = makeNotifyToast();
    const value = inputTripsRef.current?.value ?? "";

    if (!value) {
      notify.warning({ title: "Digite uma viagem" });
      return;
    }

    setTrips((prev) => [...prev, value]);
    if (inputTripsRef.current) {
      inputTripsRef.current.value = "";
    }
  }

  function handlerCreateDriverTruck() {
    handleSubmit((data: FormCreateDriverProps) => {
      const driver = {
        name: data.name,
        lastName: data.lastName,
        email: data.email,
        CPF: data.CPF,
        CNH: data.CNH,
        totalKmDriven: parseInt(data.totalKmDriven),
        trips,
      } satisfies ICreateDriverDTO;

      dispatch(loadCreateDriver(driver));
      reset();
    })();
  }

  function seedDriverTrucks() {
    driverTrucks.forEach((driver) => {
      const newDriver = {
        name: driver.name,
        lastName: driver.lastName,
        email: driver.email,
        CPF: driver.CPF,
        CNH: driver.CNH,
        totalKmDriven: driver.totalKmDriven,
        trips: driver.trips,
      } satisfies ICreateDriverDTO;

      dispatch(loadCreateDriver(newDriver));
    });
  }

  return {
    trips,
    errors,
    isLoading,
    inputTripsRef,
    register,
    handlerAddTrip,
    handlerCreateDriverTruck,
    seedDriverTrucks,
  };
}
