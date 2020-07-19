export interface Config {
  bot: {
    prefix: string;
    token: string;
  };

  database: {
    hostname: string;
    port: number;
    username: string;
    password: string;
    database: string;
    logQueries: boolean;
  };
}

export const Defaults: Config = {
  bot: {
    prefix: "-",
    token: null,
  },
  database: {
    hostname: "localhost",
    port: 5432,
    username: "root",
    password: "",
    database: "korosan",
    logQueries: false,
  },
};
