import {Car} from "@/lib/types/models";
import Link from "next/link";
import Image from "next/image";
import {fuelTypes} from "@/lib/types/fuelTypes";
import {CarIcon, CarSeat, GasPump} from "@/app/icons";

export default function CarCard({props}: { props: Car })
{
    // If the user didn't upload some car images yet, then the car is not ready for renting.
    const isNotCompleted = !props.img_urls || props.img_urls.length <= 0;

    return (
        <Link
            className={"card bg-base-100 rounded-box overflow-hidden w-full shadow-lg hover:shadow-xl " +
                `transition-shadow ${!isNotCompleted && `pointer-events-none`}`}
            href={`./cars/new-car/upload_images/${props.id}/`}
            aria-disabled={isNotCompleted}
            tabIndex={!isNotCompleted ? -1 : undefined}>

            <figure className="relative h-56 w-full rounded-t-lg overflow-hidden">
                {/* Color Circle */}
                <div className="absolute top-2 right-2 w-8 h-8 rounded-full border-2 border-white z-10"
                     style={{backgroundColor: props.color}}
                     title="สีรถ"
                />
                {!isNotCompleted ?
                    <Image
                        fill
                        unoptimized
                        src={props.img_urls[0]}
                        alt={`${props.manufacturer} ${props.model} image`}
                        className="object-cover"
                    />
                    :
                    <ErrorMessage/>
                }
            </figure>

            <div className="card-body p-6 pb-7 gap-4">
                <h3 className="card-title items-end text-2xl font-bold mb-2">{props.manufacturer} {props.model}</h3>

                <IconsSection props={props}/>

                <div className="card-actions items-center relative">
                    <div
                        className='group w-36 h-16 -mr-6 -mb-7 ml-auto bg-neutral rounded-full justify-center items-center rounded-r-none flex  relative'
                    >
                        <div className='flex flex-col ml-auto items-end pr-6'>
                                <span
                                    className="text-sm font-medium text-slate-300">ราคาต่อวัน:</span>
                            <h3 className="font-bold text-lg text-primary">฿{props.price_per_day}</h3>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
        ;
}


function IconsSection({props}: { props: Car })
{
    return (
        <div className='flex my-4 gap-6 justify-evenly font-medium'>

            <div className="flex flex-col items-center gap-2">
                <GasPump width={'1.4em'}/>
                <span>{fuelTypes[props.fuel - 1].label}</span>
            </div>

            <div className="flex flex-col items-center gap-2">
                <CarSeat/>
                <span>{props.seats} ที่นั่ง</span>
            </div>

            <div className="flex flex-col items-center gap-2 " data-tip="Car Type">
                <CarIcon/>
                <span>{props.type_display}</span>
            </div>
        </div>
    );
}

function ErrorMessage()
{
    return (
        <div
            className="flex text-center flex-col justify-center items-center gap-4 p-4 bg-error text-error-content h-56"
        >
      <span>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current mr-2 inline-block"
            fill="none"
            viewBox="0 0 24 24"
        >
          <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        ข้อมูลรถไม่สมบูรณ์
      </span>
            รถนี้ยังไม่พร้อมให้เช่า กรุณากรอกข้อมูลให้ครบถ้วนเพื่อเปิดให้บริการ
            <button className="btn btn-outline btn-sm text-error-content">เพิ่มรายละเอียด</button>
        </div>
    );
}
