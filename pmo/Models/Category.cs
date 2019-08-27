using System;
using System.Collections.Generic;

namespace pmo.Models
{
    public partial class Category
    {
        public Category()
        {
            Document = new HashSet<Document>();

            CategoryCreatedDate = DateTime.Now;
            CategoryModifiedDate = DateTime.Now;
        }

        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
        public string CategoryDescription { get; set; }
        public byte[] FileStream { get; set; }
        public DateTime CategoryCreatedDate { get; set; }
        public DateTime CategoryModifiedDate { get; set; }

        public virtual ICollection<Document> Document { get; set; }
    }
}
