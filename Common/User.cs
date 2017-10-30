using System;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace Common
{
    [DataContract]
    //[Table("User")]
    public class User
    {
        #region Scalar Properties
        [DataMember]
        [Required]
        [StringLength(50)]
        [Key]
        public string UserName { get; set; }

        [DataMember]
        [Required]
        [StringLength(25)]
        public string FirstName { get; set; }

        [DataMember]
        [Required]
        [StringLength(25)]
        public string LastName { get; set; }

        [DataMember]
        [Required]
        [StringLength(50)]
        public string Email { get; set; }


        [DataMember]
        public DateTime? LastLogin { get; set; }

        [DataMember]
        public DateTime? CreateDate { get; set; }
        #endregion
    }
}
