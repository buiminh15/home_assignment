import React from "react";
import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Header from "@/components/Header";
import BannerFrame from "@/components/BannerFramer/BannerFrame";
import clsx from "clsx";
import Datetime from "react-datetime";

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

function Home() {
  const {
    register,
    handleSubmit,
    setError,
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

  console.log("dimensions::: ", dimensions);

  const handleSelectedTags = (name: string) => {
    const remainTags = tags.filter((tag) => tag !== name);
    setTags(remainTags);
    setSelectedTags([...selectedTags, name]);
  };

  const handleUnSelectedTags = (
    event: React.MouseEvent<HTMLButtonElement>,
    name: string
  ) => {
    event.stopPropagation();
    const remainTags = selectedTags.filter((tag) => tag !== name);
    setTags([...tags, name]);
    setSelectedTags(remainTags);
  };

  const handleNavMenu = (state: boolean) => {
    setOpenNav(state);
  };

  const handleSetBanner = (banner: string) => {
    setBanner(banner);
  };

  const onSubmit = async (data: any) => {
    console.log("data", data);
    const payload: AccountPayload = {
      title: data.title,
      startAt: "2022-10-11T19:00:00+00:00",
      venue: data.venue,
      capacity: data.capacity,
      price: data.cost,
      description: data.description,
      isManualApprove: data.attendees,
      privacy: data.privacy,
      banner: hasBanner,
      tags,
    };
    // const res = (await createAccount({
    //   path: URL_PATH.social,
    //   payload,
    // })) as unknown as AccountResponse;
    // setData(res);

    const headers = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post("/social", payload, headers);
    setData(res.data as AccountResponse);
  };

  const onSubmit1 = async () => {
    const payload: AccountPayload = {
      title:
        "Web3 Founders & Designers Mixer + fireside chat with Coinbase Senior Designer & Airfoil founder",
      startAt: "2022-10-11T19:00:00+00:00",
      venue: "Chelsea Market (163 W 20nd Street). Manhattan, NYC",
      capacity: 50,
      price: 30,
      description:
        "Calling all web3 founders and designers for an exciting night of exchanging ideas and making new friends! Make friends with fellow designers and founders in web3. There will also be lots of insights to be gained through an intimate chat\n+Q&A with two giants in the industry: \n\nPhil Hedayatnia, Founder & CEO of Airfoil, a\ngrowth design studio that has designed and built products in web3, the creator economy,\nthe future of work, and much more for 80+ startups since 2018 \n\nJihoon Suh, Senior\nProduct Designer at Coinbase, who was previously Senior Product Designer for Messenger\nfor Meta. \n\nThis will be a curated group with limited spots, so do sign up early!\n\nAbout\nAirfoil: \n\nAirfoil Studio is the design, branding, and engineering team helping web3 take flight. As one of crypto's first large-scale design firms, we aim to design a friendlier\nfinancial layer for the internet. We're a team of 85+ creatives, working from Airfoil's hubs in\nToronto, Singapore, and Seoul, who've worked on 100+ projects since 2018, including\nSolana Pay, Drift Protocol, Bonfida Solana Name Service, Utopia Labs, Planetarium,\nLayer3.xyz, MarginFi, Hyperspace, VBA Game, and more.\n\nLearn more about Airfoil and\nour work at airfoil.studio.",
      isManualApprove: true,
      privacy: "Public",
      banner:
        "https://supermomos-app-resourcesus.s3.amazonaws.com/Images/SocialBanner/banner_1.jpg",
      tags: ["Product", "Design"],
    };
    const headers = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post("/social", payload, headers);
    setData(res.data as AccountResponse);
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
                <Image
                  src='/assets/icons/date.svg'
                  width={16}
                  height={16}
                  alt='date icon'
                />

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
                <p className={clsx(inter.className)} role='alert'>
                  {errors.date?.message as unknown as string}
                </p>
              )}
            </div>

            {/* time */}
            <div className={clsx(styles.mb12)}>
              <div className={clsx(styles.inputWrapper, styles.row)}>
                <Image
                  src='/assets/icons/time.svg'
                  width={16}
                  height={16}
                  alt='time icon'
                />
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
                <p className={clsx(inter.className)} role='alert'>
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
            />
            {/* {errors.banner && (
            <p
              className={clsx(inter.className)}
              style={{ paddingLeft: 0 }}
              role="alert"
            >
              {errors.banner?.message as unknown as string}
            </p>
          )} */}
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
            <input
              type='checkbox'
              id='attendees'
              className={clsx(styles.checkbox)}
              {...register("attendees")}
              name='attendees'
            />
            <label
              htmlFor='attendees'
              className={clsx(
                inter.className,
                styles.tagDesc,
                styles.tagColorBlack
              )}
            >
              I want to approve attendees
            </label>
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
                  key={tag}
                  name={tag}
                  textStyle={inter.className}
                  handleSelect={() => handleSelectedTags(tag)}
                />
              ))}
            </div>
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
          <div className={clsx(styles.gridContainer)}>
            <div
              ref={targetRef}
              className={clsx(
                styles.wFull,
                styles.mb12,
                styles.gridTwoSpanCol,
                styles.titleDataWrapper
              )}
            >
              <div className={clsx(styles.inputWrapper, inter.className)}>
                <div className={clsx(styles.input, styles.wFull)}>
                  <span className={clsx(styles.titleData)}>{data?.title}</span>
                </div>
              </div>
            </div>
            {/* date */}
            <div
              className={clsx(styles.mb12, styles.wFull, inter.className)}
              style={{ marginTop: `${dimensions.height + 10}px` }}
            >
              <div className={clsx(styles.inputWrapper, styles.row)}>
                <Image
                  src='/assets/icons/date.svg'
                  width={16}
                  height={16}
                  alt='date icon'
                />
                <span>
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
                <Image
                  src='/assets/icons/time.svg'
                  width={16}
                  height={16}
                  alt='time icon'
                />
                <span>{dayjs(data?.startAt.split("T")[0]).format("h A")}</span>
              </div>
            </div>

            {/* location */}
            <div
              className={clsx(styles.row, styles.mb12, styles.gridTwoSpanCol)}
            >
              <div className={clsx(styles.wFull, inter.className)}>
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
            <div className={clsx(styles.mb32, inter.className)}>
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
                className={clsx(styles.input, styles.wFull, inter.className)}
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

          <button
            style={{ padding: 10, backgroundColor: "green" }}
            onClick={onSubmit1}
          >
            TEST 1
          </button>
        </section>
      </main>
    </>
  );
}

export default Home;
