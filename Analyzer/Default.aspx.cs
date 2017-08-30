using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Services;
using MySql.Data.MySqlClient;

namespace Analyzer
{
    public partial class Default : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        public static string getData()
        {
            MySqlConnectionStringBuilder conn_string = new MySqlConnectionStringBuilder();
            conn_string.Server = "www.huckshome.com";
            conn_string.Port = 3306;
            conn_string.UserID = "analyzer";
            conn_string.Password = "EKsDhW0FPoSt8A7D";
            conn_string.Database = "analyzer";

            using (MySqlConnection conn = new MySqlConnection(conn_string.ToString()))
            using (MySqlCommand cmd = new MySqlCommand("select * from buys"))
            {
                conn.Open();
                using (MySqlDataReader reader = cmd.ExecuteReader())
                {
                    if (reader.HasRows)
                    {
                        while (reader.Read())
                        {

                        }
                    }
                }
            }

            return "";
        }
    }
}