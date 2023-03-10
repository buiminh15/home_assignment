import React from "react";
import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import styles from "@/styles/Home.module.css";
import Header from "@/components/Header";
import BannerFrame from "@/components/BannerFramer/BannerFrame";
import clsx from "clsx";
import Datetime from "react-datetime";
import Checkbox from "react-custom-checkbox";
import * as Icon from "react-icons/fi";

import "react-datetime/css/react-datetime.css";
import { TAGS, URL_PATH } from "@/constants/vars";
import Tag from "@/components/Tag/Tag";
import { useForm, Controller, Resolver } from "react-hook-form";
import { createAccount } from "@/api/request";
import { AiFillBook } from "react-icons/ai";
import { AccountPayload, AccountResponse } from "@/types/AccountType";
import axios from "axios";
import dayjs from "dayjs";

const inter = Inter({ subsets: ["latin"] });

const neue = localFont({
  src: [
    {
      path: "../../public/assets/fonts/NeueHaasDisplayBold.woff2",
    },
    {
      path: "../../public/assets/fonts/NeueHaasDisplayMediu.woff2",
    },
  ],
  fallback: ["Helvetica", "ui-sans-serif"],
});

const neueMedium = localFont({
  src: [
    {
      path: "../../public/assets/fonts/NeueHaasDisplayMediu.woff2",
    },
  ],
  fallback: ["Helvetica", "ui-sans-serif"],
});

function Home() {
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    control,
    formState: { errors },
  } = useForm<any>();
  const targetRef = React.useRef<HTMLInputElement>(null);
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);
  const [isOpeNav, setOpenNav] = React.useState(false);
  const [hasBanner, setBanner] = React.useState<string>("");
  const [data, setData] = React.useState<AccountResponse>();
  const [tags, setTags] = React.useState<string[]>(TAGS);
  const [dimensions, setDimensions] = React.useState({ width: 0, height: 0 });

  React.useEffect(() => {
    if (data && targetRef.current) {
      setDimensions({
        width: targetRef.current.offsetWidth,
        height: targetRef.current.offsetHeight,
      });
    }
  }, [JSON.stringify(data)]);

  const handleSelectedTags = (name: string) => {
    const remainTags = tags.filter((tag) => tag !== name);
    setTags(remainTags);
    setSelectedTags([...selectedTags, name]);
    clearErrors("tags");
  };

  const handleUnSelectedTags = (
    event: React.MouseEvent<HTMLButtonElement>,
    name: string
  ) => {
    event.stopPropagation();
    const remainTags = selectedTags.filter((tag) => tag !== name);
    setTags([...tags, name]);
    setSelectedTags(remainTags);
    if (!remainTags.length) {
      setError("tags", {
        message: "Tags are required",
      });
    }
  };

  const handleNavMenu = (state: boolean) => {
    setOpenNav(state);
  };

  const handleSetBanner = (banner: string) => {
    setBanner(banner);
    clearErrors("banner");
  };

  const onSubmit = async (data: any) => {
    try {
      const convertedDate = dayjs(data.date).format("YYYY-MM-DD");
      const convertedTime = dayjs(data.time).format("hh:mm:ss");
      const payload: AccountPayload = {
        title: data.title,
        startAt: `${convertedDate}T${convertedTime}+00:00`,
        venue: data.venue,
        capacity: data.capacity,
        price: data.cost,
        description: data.description,
        isManualApprove: data.attendees,
        privacy: data.privacy,
        banner: hasBanner,
        tags: selectedTags,
      };

      const res = (await createAccount({
        path: URL_PATH.social,
        payload,
      })) as unknown as AccountResponse;
      setData(res);
    } catch (error) {
      console.log("📢 [index.tsx:94]", error);
      alert(JSON.stringify(error));
    }
  };

  const renderForm = () => {
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={clsx(styles.gridParentContainer)}>
          <div className={clsx(styles.gridContainer)}>
            <div
              className={clsx(styles.wFull, styles.mb12, styles.gridTwoSpanCol)}
            >
              <div className={clsx(styles.inputWrapper)}>
                <AiFillBook size={16} color='#14597A' />
                <div className={clsx(styles.input, styles.wFull)}>
                  <input
                    maxLength={100}
                    type='text'
                    className={clsx(styles.wFull)}
                    {...register("title", {
                      required: "Title is required",
                    })}
                  />
                </div>
              </div>
              {errors.title && (
                <p className={clsx(inter.className)} role='alert'>
                  {errors.title?.message as unknown as string}
                </p>
              )}
            </div>

            {/* date */}
            <div className={clsx(styles.mb12, styles.wFull)}>
              <div className={clsx(styles.inputWrapper, styles.row)}>
                <div className={clsx(styles.iconBig)}>
                  <Image
                    src='/assets/icons/date.svg'
                    width={34}
                    height={34}
                    alt='date icon'
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </div>

                <Controller
                  name='date'
                  control={control}
                  rules={{ required: "Date is required" }}
                  render={({ field }) => (
                    <Datetime
                      closeOnSelect
                      className={clsx(
                        styles.input,
                        styles.wFull,
                        styles.unsetRelative
                      )}
                      dateFormat='MMMM DD, ddd'
                      timeFormat={false}
                      {...field}
                    />
                  )}
                />
              </div>

              {errors.date && (
                <p
                  className={clsx(inter.className, styles.paddingIconBig)}
                  role='alert'
                >
                  {errors.date?.message as unknown as string}
                </p>
              )}
            </div>

            {/* time */}
            <div className={clsx(styles.mb12)}>
              <div className={clsx(styles.inputWrapper, styles.row)}>
                <div className={clsx(styles.iconBig)}>
                  <Image
                    src='/assets/icons/time.svg'
                    width={16}
                    height={16}
                    alt='time icon'
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </div>
                <Controller
                  name='time'
                  control={control}
                  rules={{ required: "Time is required" }}
                  render={({ field }) => (
                    <Datetime
                      closeOnSelect
                      className={clsx(
                        styles.input,
                        styles.wFull,
                        styles.unsetRelative
                      )}
                      timeFormat='h A'
                      dateFormat={false}
                      {...field}
                    />
                  )}
                />
              </div>
              {errors.time && (
                <p
                  className={clsx(inter.className, styles.paddingIconBig)}
                  role='alert'
                >
                  {errors.time?.message as unknown as string}
                </p>
              )}
            </div>

            {/* location */}
            <div
              className={clsx(styles.row, styles.mb12, styles.gridTwoSpanCol)}
            >
              <div className={clsx(styles.wFull)}>
                <div className={clsx(styles.inputWrapper)}>
                  <Image
                    src='/assets/icons/location.svg'
                    width={14}
                    height={16}
                    alt='location icon'
                  />
                  <div className={clsx(styles.input, styles.wFull)}>
                    <input
                      type='text'
                      className={clsx(styles.wFull)}
                      {...register("venue", {
                        required: "Location is required",
                      })}
                    />
                  </div>
                </div>
                {errors.venue && (
                  <p role='alert' className={clsx(inter.className)}>
                    {errors.venue?.message as unknown as string}
                  </p>
                )}
              </div>
            </div>
            {/* capacity */}
            <div className={clsx(styles.mb32)}>
              <div className={clsx(styles.inputWrapper, styles.row)}>
                <Image
                  src='/assets/icons/capacity.svg'
                  width={16}
                  height={14}
                  alt='capacity icon'
                />
                <div className={clsx(styles.input, styles.wFull)}>
                  <input
                    placeholder='Max capacity'
                    type='number'
                    min={0}
                    className={clsx(styles.wFull)}
                    {...register("capacity", {
                      required: "Max capacity is required",
                    })}
                  />
                </div>
              </div>
              {errors.capacity && (
                <p className={clsx(inter.className)} role='alert'>
                  {errors.capacity?.message as unknown as string}
                </p>
              )}
            </div>

            {/* cost */}
            <div className={clsx(styles.inputWrapper, styles.row, styles.mb32)}>
              <Image
                src='/assets/icons/costs.svg'
                width={16}
                height={16}
                alt='costs icon'
              />
              <div className={clsx(styles.input, styles.wFull)}>
                <input
                  placeholder='Cost per person'
                  type='number'
                  min={0}
                  className={clsx(styles.wFull)}
                  {...register("cost")}
                />
              </div>
            </div>
          </div>
          <div className={clsx(styles.bannerFramer, styles.mb32)}>
            <BannerFrame
              navState={isOpeNav}
              handleSetBanner={handleSetBanner}
              {...register("banner", {
                required: "Banner is required",
              })}
            />
            {errors.banner && (
              <p
                className={clsx(inter.className)}
                style={{ paddingLeft: 0 }}
                role='alert'
              >
                {errors.banner?.message as unknown as string}
              </p>
            )}
          </div>
        </div>
        {/* description */}
        <div
          className={clsx(
            styles.wFull,
            styles.col,
            styles.mb32,
            styles.wResponsive
          )}
        >
          <label
            htmlFor='description'
            style={{ color: "#333", marginBottom: 6 }}
            className={clsx(inter.className, styles.tagDesc)}
          >
            Description
          </label>
          <textarea
            placeholder='Description of your event...'
            className={clsx(styles.textarea, inter.className, styles.tagDesc)}
            id='description'
            cols={30}
            rows={10}
            {...register("description", {
              required: "Description is required",
            })}
            name='description'
          />
          {errors.description && (
            <p
              className={clsx(inter.className)}
              style={{ paddingLeft: 0 }}
              role='alert'
            >
              {errors.description?.message as unknown as string}
            </p>
          )}
        </div>

        {/* settings */}
        <div
          className={clsx(
            styles.settingsContainer,
            styles.mb32,
            styles.wResponsive
          )}
        >
          <h3
            className={clsx(styles.textSettings, inter.className, styles.mb12)}
          >
            Settings
          </h3>

          <div className={clsx(styles.row, styles.mb12)}>
            <Controller
              name='attendees'
              control={control}
              render={({ field }) => (
                <Checkbox
                  icon={<Icon.FiCheck color='#174A41' size={12} />}
                  {...field}
                  checked={false}
                  borderColor='#D0D5DD'
                  style={{ cursor: "pointer" }}
                  labelClassName={clsx(
                    inter.className,
                    styles.tagDesc,
                    styles.tagColorBlack
                  )}
                  labelStyle={{ marginLeft: 8, userSelect: "none" }}
                  label='I want to approve attendees'
                />
              )}
            />
          </div>
          <div>
            <p
              className={clsx(
                inter.className,
                styles.tagHeader,
                styles.tagColorBlack
              )}
            >
              Privacy
            </p>
            <div className={clsx(styles.row, styles.mb12)}>
              <div className={clsx(styles.rowInline)}>
                <input
                  type='radio'
                  id='public'
                  value='Public'
                  {...register("privacy", {
                    required: "Privacy is required",
                  })}
                  name='privacy'
                />
                <label
                  htmlFor='public'
                  className={clsx(inter.className, styles.tagDesc)}
                >
                  Public
                </label>
              </div>
              <div className={clsx(styles.rowInline)}>
                <input
                  type='radio'
                  id='audience'
                  value='Curated Audience'
                  {...register("privacy", {
                    required: "Privacy is required",
                  })}
                  name='privacy'
                />
                <label
                  htmlFor='audience'
                  className={clsx(inter.className, styles.tagDesc)}
                >
                  Curated Audience
                </label>
              </div>
              <div className={clsx(styles.rowInline)}>
                <input
                  type='radio'
                  id='community'
                  value='Community Only'
                  {...register("privacy", {
                    required: "Privacy is required",
                  })}
                  name='privacy'
                />
                <label
                  htmlFor='community'
                  className={clsx(inter.className, styles.tagDesc)}
                >
                  Community Only
                </label>
              </div>
            </div>
            {errors.privacy && (
              <p
                role='alert'
                className={clsx(inter.className)}
                style={{ paddingLeft: 0, marginBottom: 2, marginTop: -8 }}
              >
                {errors.privacy?.message as unknown as string}
              </p>
            )}
          </div>

          <div className={clsx(styles.col)}>
            <p
              className={clsx(
                inter.className,
                styles.tagHeader,
                styles.tagColorBlack
              )}
            >
              Tag your social
            </p>
            <p className={clsx(inter.className, styles.tagDesc, styles.mb12)}>
              Pick tags for our curation engine to work its magin
            </p>

            <div className={clsx(styles.row, styles.mb12)}>
              {selectedTags.map((tag) => (
                <Tag
                  key={tag}
                  name={tag}
                  isSelected
                  textStyle={inter.className}
                  handleUnSelected={(e) => handleUnSelectedTags(e, tag)}
                />
              ))}
            </div>
            <div className={clsx(styles.row)}>
              {tags.map((tag) => (
                <Tag
                  {...register("tags", {
                    required: "Tags are required",
                  })}
                  key={tag}
                  name={tag}
                  textStyle={inter.className}
                  handleSelect={() => handleSelectedTags(tag)}
                />
              ))}
            </div>
            {errors.tags && (
              <p
                role='alert'
                className={clsx(inter.className)}
                style={{ paddingLeft: 0, marginBottom: 2, marginTop: 8 }}
              >
                {errors.tags?.message as unknown as string}
              </p>
            )}
          </div>
        </div>

        <button
          type='submit'
          className={clsx(
            styles.submitBtn,
            styles.mb32,
            inter.className,
            styles.wResponsive
          )}
        >
          create social
        </button>
      </form>
    );
  };

  const renderData = () => {
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={clsx(styles.gridParentContainer)}>
          <div className={clsx(styles.gridContainer, styles.gridContainerData)}>
            <div
              ref={targetRef}
              className={clsx(
                styles.wFull,
                styles.mb12,
                styles.gridTwoSpanCol,
                styles.titleDataWrapper
              )}
            >
              <div
                className={clsx(
                  styles.inputWrapper,
                  neue.style.fontFamily,
                  neue.className
                )}
              >
                <div className={clsx(styles.input, styles.wFull)}>
                  <span className={clsx(styles.titleData)}>{data?.title}</span>
                </div>
              </div>
            </div>
            {/* date */}
            <div
              className={clsx(styles.mb12, styles.wFull, styles.rowSpan)}
              style={{ marginTop: `${dimensions.height + 10}px` }}
            >
              <div className={clsx(styles.inputWrapper, styles.row)}>
                <div className={clsx(styles.iconBig)}>
                  <Image
                    src='/assets/icons/date.svg'
                    width={16}
                    height={16}
                    alt='date icon'
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </div>
                <span className={clsx(neue.className, styles.dateTimeText)}>
                  {dayjs(data?.startAt.split("T")[0]).format("MMMM DD, ddd")}
                </span>
              </div>
            </div>

            {/* time */}
            <div
              className={clsx(styles.mb12, inter.className)}
              style={{ marginTop: `${dimensions.height + 10}px` }}
            >
              <div className={clsx(styles.inputWrapper, styles.row)}>
                <div className={clsx(styles.iconBig)}>
                  <Image
                    src='/assets/icons/time.svg'
                    width={16}
                    height={16}
                    alt='time icon'
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </div>
                <span className={clsx(neue.className, styles.dateTimeText)}>
                  {dayjs(data?.startAt.split("T")[0]).format("h A")}
                </span>
              </div>
            </div>

            {/* location */}
            <div
              className={clsx(styles.row, styles.mb12, styles.gridTwoSpanCol)}
            >
              <div className={clsx(styles.wFull, neueMedium.className)}>
                <div className={clsx(styles.inputWrapper)}>
                  <Image
                    src='/assets/icons/location.svg'
                    width={14}
                    height={16}
                    alt='location icon'
                  />
                  <div className={clsx(styles.input, styles.wFull)}>
                    <span>{data?.venue}</span>
                  </div>
                </div>
              </div>
            </div>
            {/* capacity */}
            <div className={clsx(styles.mb32, neueMedium.className)}>
              <div className={clsx(styles.inputWrapper, styles.row)}>
                <Image
                  src='/assets/icons/capacity.svg'
                  width={16}
                  height={14}
                  alt='capacity icon'
                />
                <div className={clsx(styles.input, styles.wFull)}>
                  <span>{data?.capacity}</span>
                </div>
              </div>
            </div>

            {/* cost */}
            <div className={clsx(styles.inputWrapper, styles.row, styles.mb32)}>
              <Image
                src='/assets/icons/costs.svg'
                width={16}
                height={16}
                alt='costs icon'
              />
              <div
                className={clsx(
                  styles.input,
                  styles.wFull,
                  neueMedium.className
                )}
              >
                <span>{data?.price}</span>
              </div>
            </div>
          </div>
          <div className={clsx(styles.bannerFramer, styles.mb32)}>
            <BannerFrame
              navState={isOpeNav}
              handleSetBanner={handleSetBanner}
              banner={data?.banner.replace("resourcesus", "resources-us")}
            />
          </div>
        </div>
        {/* description */}
        <div
          className={clsx(
            styles.wFull,
            styles.col,
            styles.mb32,
            styles.wResponsive,
            inter.className
          )}
        >
          <span>{data?.description}</span>
        </div>
      </form>
    );
  };

  return (
    <>
      <Head>
        <title>Supermomos</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className={styles.main}>
        <Header handleSideNav={handleNavMenu} />

        <section className={clsx(styles.sectionContainer)}>
          {data ? renderData() : renderForm()}
        </section>
      </main>
    </>
  );
}

export default Home;
